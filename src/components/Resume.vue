<template>
  <section class="resume" id="resume">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-4 mb-4 text-center text-md-right">
          <h3>Professional Summary</h3>
        </div>
        <div class="col-sm-12 col-md-8 text-center text-md-left">
          <p>
            Javascript has been my main programming language for two years and
            I'm deeply increasing my knowledge of modern frameworks like
            <strong>React</strong> and <strong>Vue</strong> and the world around
            these technologies.
          </p>
          <p>
            Other than that, I'm also a <strong>WordPress</strong> developer
            (plugin development, standard and e-commerce websites with
            prepackaged or custom templates). Experienced also on
            <strong>WordPress REST API</strong> with React as front end
            framework.
          </p>
          <p>
            I've been able to set up extremely performing sites by hacking with
            cache and custom settings at the server level. From here I can
            develop a fully custom web marketing campaign aim to accomplish the
            business objective.
          </p>
          <p>
            As a web developer, I love to work and learn new technologies,Agile
            software development mostly in team (big fan of
            <strong>Agile software development</strong>).
          </p>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-sm-12 col-md-4 mb-4 text-center text-md-right">
          <h3>Main Skills</h3>
        </div>
        <div class="col-sm-12 col-md-8 text-center text-md-left">
          <div class="row">
            <div class="col-sm-6">
              <ul>
                <li>
                  Javascript dev with <strong>VueJs</strong> and
                  <strong>React</strong> framework
                </li>
                <li>
                  CSS libraries (Bootstrap 3/4, Material-UI, Foundation) and CSS
                  organization style (SMACSS, BEM)
                </li>
                <li>WordPress dev for websites and e-commerce</li>
              </ul>
            </div>
            <div class="col-sm-6">
              <ul>
                <li>Complete web marketing campaigns planning</li>
                <li>
                  Google Ads and Merchant Center, Google Analytics, Enhanced
                  Ecommerce, Google Tag Manager, Google Search Console, Pixel
                  Facebook and Facebook Ads, G Suite, Google Ad Manager
                </li>
                <li>Team management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-sm-12 col-md-4 mb-4 text-center text-md-right">
          <h3>Sub Skills</h3>
          <p>
            An unordered list of skills, frameworks, software/applications i've
            used or experienced
          </p>
        </div>
        <div class="col-sm-12 col-md-8 text-center text-md-left">
          <p>
            AJAX, HAML/SLIM, SASS, XML, Capistrano, GIT, jQuery, Responsive
            Design, Adobe: Photoshop/Illustrator/InDesign/Premiere/After
            Effects, Cinema 4D, Mac OS X, Linux, Windows, SQL, Redis, MongoDB,
            ZSH, Visual Studio Code, UNIX shell, Chrome Dev Tools, Xcode, cross
            browser compatibility, Figma, Adobe XD.
          </p>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-sm-12 col-md-4 mb-4 text-center text-md-right">
          <h3>Work</h3>
        </div>
        <div class="col-sm-12 col-md-8 text-center text-md-left">
          <h4>Freelance</h4>
          <span>2013/03 - Present</span>
          <ul>
            <li>Javascript development with Vue and React</li>
            <li>WordPress development with GIT/Capistrano deploy system</li>
            <li>
              Used programming capabilities in PHP, SQL and JavaScript and other
              libraries as needed
            </li>
            <li>Converted mockups into HTML, CSS and JavaScript</li>
            <li>Hands-on experience using UNIX and Apache web servers</li>
            <li>
              Designed, implemented and monitored web pages and sites for
              continuous improvement Improved methods for measurement,
              documentation and work flow management
            </li>
            <li>
              Created eye catching and functional digital design concepts across
              various platforms to strengthen company brand and identity
            </li>
            <li>
              Tested websites and performed troubleshooting prior to deployment
            </li>
            <li>
              SEO on site (structured data/schema.org) and consultant for
              copywriters on optimization of text Social Media: from the simple
              act of creating a page to the full management of a brand/corporate
              in social
            </li>
            <li>
              Google Tag Manager certified: I use this powerful gear to monitor
              any type of websites/apps. In conjunction with Google Analytics,
              Google Ads and Facebook Pixel i'm able to report every type of
              events inside the website
            </li>
            <li>
              Google Search Console of monitoring site position on Google
              results pages
            </li>
            <li>G Suite setup for professional email platform</li>
          </ul>

          <h4 class="mt-5">Founder Co Owner at Megiston Srl</h4>
          <h5>Albignasego (PD), Italy</h5>
          <span>01/2018 - 12/2019</span>
          <ul>
            <li>Frontend dev on Ruby on Rails projects</li>
            <li>WordPress development with GIT/Capistrano deployment system</li>
            <li>Server setup and management for websites hosting</li>
            <li>Account manager and team manager</li>
            <li>Web marketing campaigns planning</li>
          </ul>

          <h4 class="mt-5">Web Marketing Manager at Megiston Associati</h4>
          <h5>Albignasego (PD), Italy</h5>
          <span>12/2013 - 12/2017</span>
          <ul>
            <li>WordPress development with GIT/Capistrano deployment system</li>
            <li>Server setup and management for websites hosting</li>
            <li>Account manager and team manager</li>
            <li>Web marketing campaigns planning</li>
          </ul>

          <h4 class="mt-5">Web Manager at Reproduction (Guglie Srl)</h4>
          <h5>Padua, Italy</h5>
          <span>12/2013 - 12/2017</span>
          <ul>
            <li>WordPress development with GIT/Capistrano deployment system</li>
            <li>Server setup and management for websites hosting</li>
            <li>Account manager and team manager</li>
            <li>Web marketing campaigns planning</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.resume {
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
