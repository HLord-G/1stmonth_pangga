
    const SECRET_CODE = "062826";
    let whiskLevel = 0;
    let milkLevel = 0;
    let compliment = "";



    /* =========================
      CHANGE SCENE
    ========================= */

    function go(id) {

      document
        .querySelectorAll('.card')
        .forEach(card => {

          card.classList.add('hidden');

        });


      document
        .getElementById(id)
        .classList.remove('hidden');

    }



    /* =========================
      MIX CHOCOLATE
    ========================= */

    function whisk() {

      whiskLevel += 20;


      if (whiskLevel > 100) {

        whiskLevel = 100;

      }


      document
        .getElementById('whiskFill')
        .style.width = whiskLevel + '%';


      const whiskIcon =
        document.getElementById('whiskIcon');


      whiskIcon
        .classList
        .add('whisking');


      setTimeout(() => {

        whiskIcon
          .classList
          .remove('whisking');

      }, 300);


      if (whiskLevel >= 100) {

        setTimeout(() => {

          go('flavor');

        }, 300);

      }

    }



    /* =========================
      CHOOSE FLAVOR
    ========================= */

    function pickFlavor(flavor) {

      const cupDisplay =
        document.getElementById('cupDisplay');


      const ingredientTitle =
        document.getElementById('ingredientTitle');


      const ingredientText =
        document.getElementById('ingredientText');


      if (flavor === 'strawberry') {

        cupDisplay.innerText =
          "🍓☕🍫";

        ingredientTitle.innerText =
          "Making Strawberry Chocolate";

        ingredientText.innerText =
          "Strawberries + chocolate 🍓🍫";

      }


      if (flavor === 'classic') {

        cupDisplay.innerText =
          "☕🍫";

        ingredientTitle.innerText =
          "Making Classic Chocolate";

        ingredientText.innerText =
          "Rich chocolate 🍫🤎";

      }


      if (flavor === 'milk') {

        cupDisplay.innerText =
          "🥛☕🍫";

        ingredientTitle.innerText =
          "Making Milk Chocolate";

        ingredientText.innerText =
          "Milk + chocolate 🥛🍫";

      }


      compliment =
        "You did great Gha! Next time I'll make you a real chocolate. I love you!💛🌹🌹🌹 🤎🍫";


      milkLevel = 0;


      document
        .getElementById('milkFill')
        .style.width = '0%';


      go('milk');

    }


    let runonce = false

    /* =========================
      ADD INGREDIENT
    ========================= */

    function pour() {

      milkLevel += 25;


      if (milkLevel > 100) {

        milkLevel = 100;

      }


      document
        .getElementById('milkFill')
        .style.width = milkLevel + '%';


      if (milkLevel >= 100) {
        if (!runonce) {
          runonce = true
              setTimeout(() => {

                alert(compliment);

                go('code');

            }, 300);
        }

      }

    }



    /* =========================
      UNLOCK LETTER
    ========================= */

    function unlock() {

      const codeInput =
        document.getElementById('codeInput');


      const error =
        document.getElementById('error');


      if (codeInput.value.trim() === SECRET_CODE) {

        error.innerText = "";


        go('letterScene');


        document
          .getElementById('polaroidImg')
          .src =
          'pangga.png';

      } else {

        error.innerText =
          "Try again Gha, ayaw ko kalimta.💭";

      }

    }



    /* ENTER KEY UNLOCK */

    document
      .getElementById('codeInput')
      .addEventListener('keydown', function(event) {

        if (event.key === 'Enter') {

          unlock();

        }

      });



    let musicStarted = false;
    function startMusic() {
      
        if (musicStarted) {
            return;
        }

        const iframe = document.getElementById("bg-music");

        if (!iframe) {
            return;
        }

        musicStarted = true;

        iframe.contentWindow.postMessage(JSON.stringify({
            event: "command",
            func: "setVolume",
            args: [20]
        }), "*");

        iframe.contentWindow.postMessage(JSON.stringify({
            event: "command",
            func: "playVideo",
            args: []
        }), "*");

    }


    /* =========================
      OPEN LETTER
    ========================= */

    function openLetter() {

        const envelope =
            document.querySelector('.envelope');

        const letterWrapper =
            document.getElementById('letterWrapper');


        envelope.style.display = 'none';

        letterWrapper
            .classList
            .remove('hidden');


        // 🎵 PLAY MUSIC ONLY WHEN LETTER OPENS
        startMusic();

    }




    /* =========================
      POLAROID DRAG EFFECT
    ========================= */

    const polaroid =
      document.getElementById('polaroid');


    let isDragging = false;

    let startX = 0;

    let startY = 0;

    let moveX = 0;

    let moveY = 0;



    polaroid
      .addEventListener('mousedown', function(event) {

        isDragging = true;


        startX = event.clientX;

        startY = event.clientY;


        polaroid.style.cursor =
          'grabbing';


        polaroid.style.transition =
          'none';

      });



    document
      .addEventListener('mousemove', function(event) {

        if (!isDragging) {

          return;

        }


        moveX =
          event.clientX - startX;


        moveY =
          event.clientY - startY;


        polaroid.style.transform =
          `translate(${moveX}px, ${moveY}px) rotate(0deg)`;

      });



    document
      .addEventListener('mouseup', function() {

        if (!isDragging) {

          return;

        }


        isDragging = false;


        polaroid.style.cursor =
          'grab';


        polaroid.style.transition =
          'transform 0.3s ease';


        polaroid.style.transform =
          'rotate(-5deg)';


        setTimeout(() => {

          polaroid.style.transition =
            'transform 0.2s ease';

        }, 300);

      });
