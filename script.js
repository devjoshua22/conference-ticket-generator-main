      document.addEventListener('DOMContentLoaded', () => { //the event that fires when the browser has finished loading the HTML

      // ---------- Avatar upload handling ----------
      const ticketFormSection = document.querySelector('#ticket-form-section')
      const ticketPreviewSection = document.querySelector('#ticket-preview-section')
      const avatarInput = document.querySelector('#avatar');
      const uploadDiv = document.querySelector('.upload');             // matches id="upload"
      const avatarErrorSmall = document.querySelector('.error-state-image');
      const avatarHelperSmall = document.querySelector('.helper');
      const uploadAfterEffect = document.querySelector('.before-upload')
      const uploadAfterEffectButtons = document.querySelectorAll('.upload > aside span')
      const uploadInnerText = document.querySelector('.upload > aside > p')
      const fullName = document.getElementById('fullName')
      const github = document.getElementById('github')
      
      function fileErrorStyling(){ //function for file upload error 

         uploadDiv.classList.add('error');            // toggles visual wrapper error
            uploadAfterEffect.classList.add('before-upload'); // adds the default upload view 
            uploadAfterEffect.classList.remove('after-upload');// replaces the successful upload view 
            avatarErrorSmall.style.display = 'inline-block';// displays the error small text
            avatarHelperSmall.style.display = 'none'; // hides the "Upload your photo (JPG or PNG, max size: 500KB)" small text 
            uploadInnerText.style.display='inline-block'; // displays the "Drag and drop or click to upload" text
            uploadAfterEffectButtons[0].style.display='none'; // hides the remove-image button
            uploadAfterEffectButtons[1].style.display='none'; // hides the change-image button
      }
      function fileSuccessStyling(){ //function for file upload success

            uploadInnerText.style.display='none'; // hides the "Drag and drop or click to upload" text
            uploadAfterEffectButtons[0].style.display='inline-block'; // unhides the remove-image button
            uploadAfterEffectButtons[1].style.display='inline-block';// unhides the change-image button
            uploadDiv.classList.remove('error');// toggles visual wrapper error
            uploadAfterEffect.classList.remove('before-upload'); // removes the default upload view 
            uploadAfterEffect.classList.add('after-upload');  // displays the successful upload view 
            avatarErrorSmall.style.display = 'none';// hides the error small text
             avatarHelperSmall.style.display = 'inline-block'; // displays the "Upload your photo (JPG or PNG, max size: 500KB)" small text 
      }
      if (avatarInput && uploadDiv) { // if the custom upload input and the custom styled input exists
        avatarInput.addEventListener('change', () => { // look for changes on the upload input
          const file = avatarInput.files[0]; // get and store the first selected file
          console.log(file.name)

          // if file exists and is too large -> show error
          if (file && file.size > 500 * 1024) { // if file size is larger than 500kb
            fileErrorStyling() // apply error styles
            console.log('Avatar: file too large');
          } else { 
           fileSuccessStyling() // apply sucess style 
            console.log('Avatar: file valid or none selected');
          }
        });
      }

	// Email validation error handling
// 1. Get the email input field and the error message element
  const emailInput = document.getElementById('email');
  const errorStateMail = document.querySelector('.error-state-mail');

// 2. Make sure both exist before adding the event listener
  if (emailInput && errorStateMail) {
    emailInput.addEventListener('input', function () {
    // 3. Regex pattern for basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 4. If user typed something AND it doesn’t match the regex → invalid
    if (emailInput.value && !emailPattern.test(emailInput.value)) { // uses .test() to compare input to regex pattern and returns a boolean value for error styling
      errorStateMail.style.display = 'inline-block';  // show error
      emailInput.style.border = 'red 0.1px solid';    // red border
    } else {
      errorStateMail.style.display = 'none';          // hide error
      emailInput.style.border = 'hsl(252, 6%, 83%) 0.1px solid'; // reset border
    }
    });
}

	     // ---------- final validation on form submit ----------

// Get references to the form and its content wrapper
  const form = document.getElementById('ticket-form');
  const formContent = document.getElementById('content');

// Add event listener for when the form is submitted
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission (no page reload)

    let isValid = true; // Flag to track if all validations pass

  // -------- Reset all borders and error messages before re-checking --------
    fullName.style.border = "0.1px solid hsl(252, 6%, 83%)";
    github.style.border = "0.1px solid hsl(252, 6%, 83%)";
    emailInput.style.border = "0.1px solid hsl(252, 6%, 83%)";
    uploadDiv.classList.remove('error');
    avatarErrorSmall.style.display = 'none';
    errorStateMail.style.display = 'none';

  // -------- Full name check --------
   if (!fullName.value.trim()) {              // If empty string after trimming spaces
      fullName.style.border = "0.2px solid red"; // Highlight border in red
      isValid = false;                           // Mark form invalid
  }

  // -------- GitHub username check --------
    if (!github.value.trim()) {                // If empty
      github.style.border = "0.2px solid red";   // Highlight border in red
      isValid = false;
  }

  // -------- Email validation check --------
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      emailInput.style.border = "0.2px solid red";   // Highlight border in red
      errorStateMail.style.display = "inline-block"; // Show "invalid email" message
      isValid = false;
  }

  // -------- File upload check (required + size limit) --------
  if (avatarInput.files.length === 0) { //checks if file was uploaded
    // No file uploaded → error state
    uploadDiv.classList.add('error'); // Add error styling to upload box
    avatarErrorSmall.textContent = "Please upload an image (max 500KB)";
    avatarHelperSmall.style.display = 'none';      // Hide helper text
    avatarErrorSmall.style.display = 'inline-block'; // Show error message
    isValid = false;
  } else {
    // File uploaded → check file size
    const file = avatarInput.files[0];
    if (file.size > 500 * 1024) { // Larger than 500KB?
      uploadDiv.classList.add('error');
      avatarErrorSmall.textContent = "File too large. Please upload under 500KB";
      avatarErrorSmall.style.display = 'inline-block';
      isValid = false;
    }
  }

  // -------- If all checks pass → show ticket preview --------
  if (isValid) {
    // Update ticket preview with form values
    document.getElementById('ticket-name').textContent = fullName.value.trim();
    document.getElementById('ticket-email').textContent = emailInput.value.trim();
    document.getElementById('ticket-name-detail').textContent = fullName.value.trim();
    document.getElementById('ticket-github-username').textContent = github.value.trim();

    // Hide the form section and show the ticket preview section
    formContent.style.display = 'none';
    ticketPreviewSection.style.display = 'block';
  }

}); 


	}); // DOMContentLoaded

