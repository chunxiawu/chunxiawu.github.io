<?php
//index.php for ch10/nature
session_start();
include("common/document_head.html");
?>
  <body onload="startRotation()">
    <header>
      <?php
      include("common/banner.php");
      include("common/menus.html");
      ?>
    </header>
    <main id="home">
      <article id="textLeft">
        <h3>Welcome to Nature's Source:<br>
          Protecting your health naturally!</h3>
        <p>Founded in 1998, Nature's Source was created to serve those who
        use alternative healing methods. Offering only the highest quality
        vitamins, minerals, supplements and herbal remedies, Nature's
        Source takes great pride in helping people live healthier, happier
        lives.</p>
        <p>Many companies that talk about customer service fail to deliver.
        Nature's Source exists to truly serve all the needs of their
        customers. Each location features dedicated on-site therapists
        along with knowledgeable staff who ensure that every customer
        receives the best quality information available. Continuing
        education seminars are a regular event at Nature's Source.</p>
      </article>
      <div id="image">
        <img id="placeholder" src=""
             alt="Healthy Lifestyle"
             width="256" height="256">
      </div>
      <p style="clear: both;">&nbsp;</p>
    </main>
    <footer>
      <?php
      include("common/footer_content.html");
      ?>
    </footer>
  </body>
</html>
