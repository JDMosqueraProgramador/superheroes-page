
document.addEventListener('DOMContentLoaded', () => {
    renderComments(JSON.parse(localStorage.getItem("comments") ?? '[]'));
});

const form = document.querySelector("#comment-form");

function capitalizeFirstLetter([ first='', ...rest ]) {
    return [ first.toUpperCase(), ...rest ].join('');
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll("input, textarea");
    const comment = buildComment(fields);
    const htmlTemplate = buildCommentToRender(comment);
    saveComment(htmlTemplate);
    renderComments([htmlTemplate]);
});

