<template>
  <section class="about" id="about">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4 mb-4 text-center text-md-right">
          <h3>What else about me?</h3>
        </div>
        <div class="col-sm-12 col-md-8 text-center text-md-left">
          <p>
            Music: I love it. While I'm working, I always listen to music, and
            as a guitarist, I love to play it. Before I moved here to Vancouver,
            I used to play in clubs with my brother Nicola (<a
              href="https://www.facebook.com/thecinas"
              target="_blank"
              >The Cinas</a
            >).
          </p>
          <p>
            I love video games too, but I grow old and there is always less time
            to play! And obviously, I love the web world: this keeps me learning
            new stuff and be amazed by all the new stuff that is coming out in
            these last years.
          </p>
          <p>
            I'm a runner and above all I'm a swimmer (I miss it in these crazy
            times!). But the sports I love to practice are the ones in team.
          </p>
          <p>
            I'm married to Sharaf and we moved to Vancouver in March 2020. We
            love this city!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about {
  background: $gray-900;
}
h3 {
  text-decoration: underline;
  text-decoration-color: $yellow;

  &::after {
    content: "";
    border: 1px solid #ffcc00;
    position: absolute;
    height: 100%;
    right: 0;
  }
}
</style>

