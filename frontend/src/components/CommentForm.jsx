import React from "react";
import { useState } from "react";

const CommentForm = (slug) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const comment = {
      name: name,
      content: content,
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/api/blog/${slug.slug}/add-comment/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      }
    )
      .then((response) => {
        if (response.status === 201) {
          console.log("Comment added successfully!");
          window.alert("已成功新增留言！");
          window.location.reload();
        } else {
          console.error("Failed to add comment.");
          console.log(slug.slug);
          console.log(`name:${name}, content:${content}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-4 p-2">
      <h3>Comments :</h3>
      <div>
        <label className="form-label">Name :</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="form-control"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <label className="form-label">Comment :</label>
        <textarea
          name="content"
          placeholder="Your Comment"
          className="form-control"
          required
          rows="3"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary my-2">
          Submit Comment
        </button>
      </div>
    </form>
  );
};
export default CommentForm;
