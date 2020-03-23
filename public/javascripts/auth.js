const nextButton = document.querySelector(".next.action-button");
const submitButton = document.querySelector(".submit.action-button");

nextButton.addEventListener('click', async (event)=>{
  event.preventDefault();
  const username = document.getElementsByName("username")[0].value
  try {
    const res = await fetch("/initLogin",{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        username:username
      })
    })
    const data = await res.json()
    submitButton.addEventListener('click', async () =>{
      const {stateToken, status, url} = data
      const pass = document.getElementsByName("pass")[0].value
      const res = await fetch("/verify", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
          "Accept": "application/json"
        },
        body:JSON.stringify({
          pass:pass,
          stateToken:stateToken,
          status:status,
          url:url
        })
      })
      const result = await res.json()
      if (result.status === 'SUCCESS') {
        const form = $('<form>', {
          method: 'POST',
          action: '/login'
        });
        $(document.body).append(form);
        const sessionTokenField = $(`<input type="hidden" name="sessionToken" value="${result.sessionToken}"/>`);
        const csrfTokenField = $(`<input type="hidden" name="_csrf" value="${csrfToken}"/>`);
        form.append(sessionTokenField);
        form.append(csrfTokenField);
        form.submit();
      }
    });
  }
  catch(e) {
    return new Error(e)
  }
})