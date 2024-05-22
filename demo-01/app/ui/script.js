function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = function(e) {
        resolve(e.target.result);
      };
      reader.onerror = function(e) {
        reject(e);
      };
      reader.readAsDataURL(file);
    });
  }
  
  document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    var files = document.getElementById('file-input').files;
    var server = document.getElementById('server-select').value;
  
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('server', server);
  
    // Display the uploaded images immediately
    var imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';
    for (var i = 0; i < files.length; i++) {
      try {
        var dataURL = await readFileAsDataURL(files[i]);
  
        var imageWrapper = document.createElement('div');
        imageWrapper.className = 'image-wrapper col-md-6';
  
        var card = document.createElement('div');
        card.className = 'card';
  
        var imageBox = document.createElement('div');
        imageBox.className = 'image-box card-img-top';
  
        var originalImage = document.createElement('img');
        originalImage.src = dataURL;
        imageBox.appendChild(originalImage);
  
        var boundingBoxes = document.createElement('img');
        boundingBoxes.style.display = 'none';
        imageBox.appendChild(boundingBoxes);
  
        card.appendChild(imageBox);
  
        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';
  
        var toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle Bounding Boxes';
        toggleButton.className = 'btn btn-secondary';
        toggleButton.onclick = (function(boundingBoxes) {
          return function() {
            boundingBoxes.style.display = boundingBoxes.style.display === 'none' ? '' : 'none';
          };
        })(boundingBoxes);
        cardBody.appendChild(toggleButton);
  
        card.appendChild(cardBody);
        imageWrapper.appendChild(card);
  
        imageContainer.appendChild(imageWrapper);
      } catch (e) {
        console.error(e);
      }
    }
  
    // Send the images to the server for inference
    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Display the bounding boxes
      var imageWrappers = document.getElementsByClassName('image-wrapper');
      for (var i = 0; i < data.length; i++) {
        var boundingBoxes = imageWrappers[i].getElementsByTagName('img')[1];
        boundingBoxes.src = 'data:image/png;base64,' + data[i].image;
      }
    })
    .catch(error => console.error(error));
  });