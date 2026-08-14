---
layout: page
permalink: /publications/
title: publications
description: Publications in reverse chronological order.
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

  <h2>Full papers</h2>
  {% bibliography -f {{ site.scholar.bibliography }} -q @*[category=full_paper]* %}

  <h2>Workshop and poster papers</h2>
  {% bibliography -f {{ site.scholar.bibliography }} -q @*[category=workshop_poster]* %}

</div>
