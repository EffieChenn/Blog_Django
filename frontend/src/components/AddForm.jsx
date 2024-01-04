import React from "react";
import { useEffect } from "react";

const AddForm = () => {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/categories/`)
      .then((response) => response.json())
      .then((data) => {
        const select = document.getElementById("categorySelect");

        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          select.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const categorySelect = document.getElementById("categorySelect");

    formData.set("category", categorySelect.value);
    console.log(formData.get("category"));

    fetch(`${process.env.REACT_APP_API_URL}/api/blog/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New blog post created:", data);
        window.alert("已成功新增文章！");
        window.location.href = "/blog";
      })
      .catch((error) => {
        console.error("Error creating blog post:", error);
      });
  };

  return (
    <div className="container">
      <form
        id="blogPostForm"
        className="row g-4 p-2"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h3>New Post :</h3>
        <div>
          <label className="form-label">Title :</label>
          <input type="text" required className="form-control" name="title" />
        </div>
        <div>
          <label className="form-label">Category :</label>
          <select id="categorySelect" name="category"></select>
        </div>
        <div>
          <label className="form-label">Excerpt :</label>
          <input type="text" required className="form-control" name="excerpt" />
        </div>
        <div>
          <label className="form-label">Month :</label>
          <input type="text" required className="form-control" name="month" />
        </div>
        <div>
          <label className="form-label">Day :</label>
          <input type="number" required className="form-control" name="day" />
        </div>
        <div>
          <label className="form-label">Thumbnail :</label>
          <input
            type="file"
            required
            className="form-control"
            name="thumbnail"
          />
        </div>
        <div>
          <label className="form-label">Content :</label>
          <textarea className="form-control" required rows="3" name="content" />
        </div>
        <div>
          <label className="form-label">Featured :</label>
          <input
            className="form-check-input ms-2"
            type="checkbox"
            value=""
            aria-label="checkbox"
            name="featured"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddForm;
