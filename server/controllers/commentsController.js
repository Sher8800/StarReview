import User from '../models/User.js'
import Comments from '../models/Comments.js';

class commentsController {

    // Get all comments
    async getAllComments(req, res) {
        try {
            const comments = await Comments.find()
            if (comments.length == 0) {
                return res.status(200).json({ message: 'No comments' })
            }

            return res.json(comments)
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: `Internal Server Error: ${e}` })
        }
    }

    async createComment(req, res) {
        try {
            const { comment, rating, commenterId, recipientId } = req.body

            // Finding the author of the comment
            const recipient = await User.findById(recipientId)
            if (!recipient) {
                return res.status(400).json({ message: 'RecipientId not found' })
            }

            // Finding the recipient of the comment
            const commenter = await User.findById(commenterId)
            if (!commenter) {
                return res.status(400).json({ message: 'CommenterId not found' })
            }

            //Create a new comment
            const newComment = new Comments({
                author: commenter._id,
                recipient: recipient._id,
                comments: comment,
                rating
            })

            //Save the comment to the database
            await newComment.save()

            // Update the recipient's comments field and add the ID of a new comment
            recipient.comments.push(newComment._id);
            await recipient.save();

            return res.status(200).json({ message: 'Comment created successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    async deleteComment(req, res) {
        try {
            const commentId = req.params.id;

            // Search for comment by id
            const comment = await Comments.findById(commentId)
            if (!comment) {
                return res.status(400).json({ message: 'Comment not found' })
            }
            // Deleting a comment
            await Comments.findByIdAndDelete(commentId);

            await User.findByIdAndUpdate(comment.recipient, { $pull: { comments: commentId } });

            return res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

}

export default new commentsController()