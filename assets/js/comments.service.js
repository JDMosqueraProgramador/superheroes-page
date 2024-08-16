const allComments = localStorage.getItem("comments") 
  ? JSON.parse(localStorage.getItem("comments")) : [];

const saveComment = (htmlTemplate) => {
  allComments.push(htmlTemplate);
  localStorage.setItem("comments", JSON.stringify(allComments));
}

const renderComments = (comments) => {
  const commentList = document.querySelector("#comments-list");
  comments.forEach(template => {
      commentList.innerHTML += template;
  });
}

const buildCommentToRender = (comment) => {
  return `
  <div>
      <h5>${comment.name}</h5>
      <p>${comment.comment}</p>
  </div>
  `;
}

const buildComment = (fields) => {
  const comment = {};
  const fieldNames = Array.from(fields).map(field => field.name);

  fieldNames.forEach((name, i) => {
      console.log(`comment['${name}'] = fields[${i}].value`);
      eval(`comment['${name}'] = fields[${i}].value`);
  });

  return comment;
}