const newPostForm = document.querySelector('#newPost');

const newPost = async (e) => {
    e.preventDefault();

    const postTitle = document.querySelector('#postTitle').value.trim();
    const postContent = document.querySelector('#postContent').value.trim();

    if (postTitle && postContent) {

        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({
                title: postTitle,
                content: postContent,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const postData = await response.json();
            document.location.replace(`/post/${postData.id}`);
        }
        else {
            alert('error with fetch')
        };
    }
    else {
        alert('fill out every field')
    };
};

newPostForm.addEventListener('submit', newPost);