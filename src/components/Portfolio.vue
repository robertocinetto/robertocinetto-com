<template>
  <section id="portfolio" class="portfolio">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="text-center mb-5">My portfolio</h2>
        </div>
      </div>
    </div>
    <div class="todolistit">
      <div class="container">
        <div class="row item">
          <div class="col-sm-6 text-center">
            <h2 class="mb-2">Todolist</h2>
            <h5 class="mb-4">
              Project type:
              <strong>Personal example project</strong>
            </h5>
            <svg
              style="margin-right:-10px;"
              width="116"
              height="100"
              viewBox="0 0 116 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 5.7735L88.3013 27.8868V72.1133L50 94.2265L11.6987 72.1133L11.6987 27.8867L50 5.7735Z"
                fill="#8400FF"
                stroke="#6C00D0"
                stroke-width="10"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M49.7143 78L14 43.3846L24 33.6923L49.7143 58.6154L104 6L114 15.6923L49.7143 78Z"
                fill="#6C00D0"
                stroke="white"
                stroke-width="2"
                stroke-linecap="square"
                stroke-dasharray="10 4"
              />
            </svg>
            <p>A very simple web app design by me, logo and palete at first. Just a few caracteristics of the app:</p>
            <ul>
              <li>
                frontend:
                <strong>React, Redux, Material UI, SASS</strong>
              </li>
              <li>
                authentication:
                <strong>Firebase</strong>
              </li>
              <li>
                database:
                <strong>Firestore</strong>
              </li>
            </ul>

            <a
              href="https://todolistit.robertocinetto.com/"
              target="_blank"
              class="btn btn-warning mt-3"
            >GO TO THE PROJECT</a>
          </div>
          <div class="col-sm-6 d-flex justify-content-center">
            <div class="box">
              <div class="box-background"></div>
              <div class="content"></div>
            </div>
            <div class="phone">
              <div class="screen">
                <img src="@/assets/portfolio/1-todolistit-login.webp" width="400px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.portfolio {
  background: $gray-900;
}

.item {
  padding-top: 60px;
}

.box {
  box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
    0 30px 60px -30px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background: $white;
}

.box-background {
  position: relative;
  grid-area: 1/1;
  height: 67%;
  transform: skewY(168deg);
  transform-origin: 0;
  overflow: hidden;
}

.phone {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: $white;
  padding: 10px;
  max-width: 350px;
  height: 500px;
  overflow: hidden;
  box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
    0 30px 60px -30px rgba(0, 0, 0, 0.3),
    inset 0 -2px 6px 0 rgba(10, 37, 64, 0.35);

  .screen {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    overflow-y: scroll;
    height: 540px;
    padding-top: 20px;
    background: #000;

    img {
      width: 100%;
    }
  }
}

.todolistit {
  background: #6c00d0;

  .box-background {
    background: #6c00d0;
  }
}
</style>