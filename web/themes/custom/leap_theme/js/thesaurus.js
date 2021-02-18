(function ($, Drupal) {

  Drupal.behaviors.thesaurusView = {
    attach: function (context, settings) {
      $('.knowledge-base-alphabetically').once('thesaurusColumns').each(function () {
        if ($('#column-1').length == 0) {
          var columnsMarkup = '<div id="column-1" class="col-sm-4"></div>'
            + '<div id="column-2" class="col-sm-4"></div>'
            + '<div id="column-3" class="col-sm-4"></div>';
          $('.knowledge-base-alphabetically .view-content').append(columnsMarkup);
        }

        $('.thesaurus-column').each(function () {
          var _columnNumber = $(this).attr('columnNumber');
          var _columnID = '#column-' + _columnNumber;
          $(this).appendTo(_columnID);
        });
      });
    }
  };

}(jQuery, Drupal));
