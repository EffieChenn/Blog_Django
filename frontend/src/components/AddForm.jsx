import React from "react";
import { useState } from "react";

const AddForm = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogpost = {
      category: "category",
      title: "title",
      thumbnail: "thumbnail",
      excerpt: "excerpt",
      month: "month",
      day: "day",
      content: "content",
      featured: "false",
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/blog/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogpost),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("blogPost added successfully!");
          window.alert("已成功新增文章！");
          window.location.reload();
        } else {
          console.error("Failed to add blogpost.");
          console.log({ blogpost });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-4 p-2">
      <h3>New Post :</h3>
      <div>
        <label className="form-label">title :</label>
        <input type="text" required className="form-control" />
      </div>
      <div>
        <label className="form-label">excerpt :</label>
        <input type="text" required className="form-control" />
      </div>
      <div>
        <label className="form-label">month :</label>
        <input type="text" required className="form-control" />
      </div>
      <div>
        <label className="form-label">day :</label>
        <input type="text" required className="form-control" />
      </div>
      <div>
        <label className="form-label">thumbnail :</label>
        <input type="file" required className="form-control" />
      </div>
      <div>
        <label className="form-label">content :</label>
        <textarea
          name="content"
          placeholder="Your Comment"
          className="form-control"
          required
          rows="3"
        />
      </div>
      <div>
        <label className="form-label">featured :</label>
        <input type="checkbox" required className="form-control" />
      </div>
      <div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </div>
    </form>
  );
};
export default AddForm;
