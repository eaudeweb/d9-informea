/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.leap_facets = {
    attach: function (context, settings) {
      $('.sidebar .block:not(.hidden)').first().addClass('first-block');
    }
  };

  Drupal.behaviors.main_menu = {

    attach: function (context, settings) {
      $("#block-leap-theme-main-menu .nav-link").click(function () {
        var href = $(this).attr('href');
        window.location.href = href;
      });
    }
  };

  Drupal.behaviors.knowledge_base = {
    attach: function (content, settings) {
      var url = window.location.href;
      var splitUrl = url.toString().split("/");
      if (splitUrl[3] == 'knowledge' && splitUrl[4] == 'overview'){
        $("body").addClass('knowledge-base-homepage');
      }

      var knowledgePage = document.getElementsByClassName('knowledge-base-homepage');
      if (knowledgePage.length > 0) {
        $(".block-views-blocktopics-topic-courses a").removeAttr('target');
      }
    }
  };

  Drupal.behaviors.country_search = {
    attach: function (context, settings) {
      $(".view:not(.view-id-event) .node-teaser .more-information .field--name-field-attached-files").attr('country-download-value', Drupal.t('Download: '));
      $(".view:not(.view-id-event) .node-teaser .more-information .field--name-field-files").attr('country-download-value', Drupal.t('Download: '));
    }
  };

  Drupal.behaviors.country_profiles = {
    attach: function (context, settings) {
      var nr = 0;
      $('#edit-filter-content-focal-point').click(function (event) {
        if (this.checked) {
          nr = nr | 32;
        } else {
          nr = nr & 5;
        }
        EvaluateFilters();
      });

      $('#edit-filter-content-technical-assistance').click(function (event) {
        if (this.checked) {
          nr = nr | 16;
        } else {
          nr = nr & 15;
        }
        EvaluateFilters();
      });

      $('#edit-filter-content-case-study').click(function (event) {
        if (this.checked) {
          nr = nr | 8;
        } else {
          nr = nr & 23;
        }
        EvaluateFilters();
      });

      $('#edit-filter-content-case-law').click(function (event) {
        if (this.checked) {
          nr = nr | 4;
        } else {
          nr = nr & 27;
        }
        EvaluateFilters();
      });

      $('#edit-filter-content-national-legislation').click(function (event) {
        if (this.checked) {
          nr = nr | 2;
        } else {
          nr = nr & 29;
        }
        EvaluateFilters();
      });
      $('#edit-filter-content-expert').click(function (event) {
        if (this.checked) {
          nr = nr | 1;
        } else {
          nr = nr & 30;
        }
        EvaluateFilters();
      });
      function EvaluateFilters() {
        if (nr === 0) {
          $('.view-id-countries .vocabulary-countries:not(.has-expert)')
            .removeClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-national-legislation)')
            .removeClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-case-law)')
            .removeClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-case-study)')
            .removeClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-support-request)')
            .removeClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-focal-point)')
            .removeClass('hidden');
        }
        else {
          $('.view-id-countries .vocabulary-countries:not(.has-expert)')
            .addClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-national-legislation)')
            .addClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-case-law)')
            .addClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-case-study)')
            .addClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-support-request)')
            .addClass('hidden');
          $('.view-id-countries .vocabulary-countries:not(.has-focal-point)')
            .addClass('hidden');

          if (nr & 1) {
            $('.view-id-countries .vocabulary-countries.has-expert')
              .removeClass('hidden');
          }
          if (nr & 2) {
            $('.view-id-countries .vocabulary-countries.has-national-legislation')
              .removeClass('hidden');
          }
          if (nr & 4) {
            $('.view-id-countries .vocabulary-countries.has-case-law')
              .removeClass('hidden');
          }
          if (nr & 8) {
            $('.view-id-countries .vocabulary-countries.has-case-study')
              .removeClass('hidden');
          }
          if (nr & 16) {
            $('.view-id-countries .vocabulary-countries.has-support-request')
              .removeClass('hidden');
          }
          if (nr & 32) {
            $('.view-id-countries .vocabulary-countries.has-focal-point')
              .removeClass('hidden');
          }
        }
      }
    }
  };

  Drupal.behaviors.external_links = {
    attach: function (context, settings) {
      $('a').each(function() {
        if (link_is_external(this)) {
        // External
          $(this).attr('target', '_blank');
        }
      });

      function link_is_external(link_element) {
        var host = window.location.href.split('/');
        var url = link_element.href.split('/');

        return (url[2] !== host[2]);
      }
    }
  };

  /**
   * This function calculates the number of dots based on parent container
   * height. The dots are recalculated when the screen is resize.
   *
   * @type {{attach:
   *     Drupal.behaviors.overview_lead_pain_alliance_block.attach}}
   */
  Drupal.behaviors.overview_lead_pain_alliance_block = {
    attach: function (context, settings) {
      let i, items;
      if (typeof $('.overview-lead-paint-alliance .items').once()[0] !== 'undefined') {
        items = $('.overview-lead-paint-alliance .items')[0].children;
      }
      reportWindowSize();
      window.addEventListener('resize', reportWindowSize);
      function reportWindowSize() {
        if (typeof items === "undefined") {
          return;
        }
        for(i = 0 ; i < items.length; i++) {
          let child = items[i];
          let area = child.children[2];
          let height = child.children[1].getElementsByClassName('lead-paint-alliance container')[0].offsetHeight;
          let count;
          let with_hover;

          switch (i) {
            case 0:
              count = 2;
              with_hover = 0;
              break;
            case 9:
              count = 3;
              with_hover = count - 1;
              break;

            default:
              count = Math.floor(height / 30);
              with_hover = Math.floor(count / 2);
          }

          area.innerHTML = '';
          let j;
          for(j = 0; j < count; j++) {
            let span = document.createElement("span");
            if (j == with_hover) {
              span.className = "dot with-hover";
            }
            else {
              span.className = "dot";
            }
            if (area.children.length < count) {
              area.appendChild(span);
            }
          }
        }
      }
    }
  };

  Drupal.behaviors.paragraph_with_bullet = {
    attach: function (context, settings) {
      $('.paragraph-with-bullet .field--name-field-content').once('paragraphBullet').each(function () {
        let i;
        let ignoreTabs = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
        let items = $(this).children();
        for (i = 0; i < items.length; i++) {
          let tag = items[i].nodeName;
          if (!ignoreTabs.includes(tag)) {
            let findChild = $(this).children(tag).first().show();
            findChild.addClass('child-with-bullet');
            return;
          }
        }
      });
    }
  };

})(jQuery, Drupal);
