import React, { useState, useContext } from 'react';
import './DescriptionBox.css';
import { UserContext } from '../../Context/UserContext';

const DescriptionBox = ({ product }) => {
    const { user } = useContext(UserContext);
    const [activeTab, setActiveTab] = useState('description');
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(product.comments);

    const handleAddComment = () => {
        if (!user) {
            alert("You must be logged in to add a comment.");
            return;
        }

        if (newComment.trim()) {
            const updatedComments = [
                ...comments,
                { user: user.name || "You", comment: newComment.trim() }
            ];

            setComments(updatedComments);


            localStorage.setItem(
                `product_${product.id}`,
                JSON.stringify({ ...product, comments: updatedComments })
            );

            setNewComment('');
        } else {
            alert("Please provide a valid comment.");
        }
    };

    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div
                    className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </div>
                <div
                    className={`descriptionbox-nav-box ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews ({comments.length})
                </div>
            </div>

            {activeTab === 'description' && (
                <div className="descriptionbox-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, porro ipsa? Tempore modi amet perferendis sed laborum quo labore dolor quia repudiandae at beatae, blanditiis incidunt voluptatibus sint dolorem sequi qui iure. Facilis debitis nihil quia iusto officia saepe, id est soluta corporis mollitia enim architecto eos blanditiis expedita laudantium?</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus nulla temporibus nemo ratione, omnis adipisci nobis alias molestias libero eligendi atque ut consequuntur quas. Expedita laudantium, sunt velit obcaecati architecto exercitationem quisquam vero ut optio fugiat libero fuga corporis quae neque qui maiores eaque culpa eum ab vitae harum accusamus repellat officiis magni? Vel minima velit exercitationem dolores ipsam repudiandae nesciunt earum blanditiis quaerat esse incidunt, perferendis ducimus animi tempore voluptas quam veniam! Cum, ratione.</p>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className="descriptionbox-reviews">
                    <div className="comments">
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <strong>{comment.user}:</strong> {comment.comment}
                            </div>
                        ))}
                    </div>

                    {user ? (
                        <div className="add-comment-form">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                            />
                            <button onClick={handleAddComment}>Add Comment</button>
                        </div>
                    ) : (
                        <p>You must be logged in to add a comment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DescriptionBox;
