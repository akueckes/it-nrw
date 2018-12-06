(function($) {

  // Behavior to load FlexSlider
  Drupal.behaviors.flexslider = {
    attach: function(context, settings) {
      var id;
      var sliders = [];
      if ($.type(settings.flexslider) !== 'undefined' && $.type(settings.flexslider.instances) !== 'undefined') {

        for (id in settings.flexslider.instances) {

          if (settings.flexslider.optionsets[settings.flexslider.instances[id]] !== undefined) {
            if (settings.flexslider.optionsets[settings.flexslider.instances[id]].asNavFor !== '') {
              // We have to initialize all the sliders which are "asNavFor" first.
              _flexslider_init(id, settings.flexslider.optionsets[settings.flexslider.instances[id]], context);
            } else {
              // Everyone else is second
              sliders[id] = settings.flexslider.optionsets[settings.flexslider.instances[id]];
            }
          }
        }
      }
      // Slider set
      for (id in sliders) {
        _flexslider_init(id, settings.flexslider.optionsets[settings.flexslider.instances[id]], context);
      }
    }
  };

  /**
   * Initialize the flexslider instance
   */

  function _flexslider_init(id, optionset, context) {
    $('#' + id, context).once('flexslider', function() {
      // Remove width/height attributes
      // @todo load the css path from the settings
      $(this).find('ul.slides > li *').removeAttr('width').removeAttr('height');

      if (optionset) {

        // Use mobile options
        if(optionset.useMobile) {
            if(!optionset.mobileOnResize) {
                if(window.innerWidth < optionset.mobileBreakpoint) {
                    optionset.minItems = optionset.mobileMinItems;
                    optionset.maxItems = optionset.mobileMaxItems;
                    optionset.itemMargin = optionset.mobileItemMargin;
                }
            }
        }

        // Add events that developers can use to interact.
        $(this).flexslider($.extend(optionset, {
          start: function(slider) {
            slider.trigger('start', [slider]);
          },
          before: function(slider) {
            slider.trigger('before', [slider]);
          },
          after: function(slider) {
            slider.trigger('after', [slider]);
          },
          end: function(slider) {
            slider.trigger('end', [slider]);
          },
          added: function(slider) {
            slider.trigger('added', [slider]);
          },
          removed: function(slider) {
            slider.trigger('removed', [slider]);
          },
          init: function(slider) {
            slider.trigger('init', [slider]);
          }
        }));

        // Dynamically switch to and from mobile options
        if(optionset.useMobile) {
            /*
             optionset is a reference to the actual optionset in Drupal.settings,
             so let's not overwrite that if were doing things dynamically
             */
            if (optionset.mobileOnResize) {
                var $isMobile = false;
                var keepOptions = {
                    mobileBreakpoint: optionset.mobileBreakpoint,
                    minItems: optionset.minItems,
                    maxItems: optionset.maxItems,
                    itemMargin: optionset.itemMargin,
                    mobileMinItems: optionset.mobileMinItems,
                    mobileMaxItems: optionset.mobileMaxItems,
                    mobileItemMargin: optionset.mobileItemMargin,
                };
                var $slider = $(this).data('flexslider');
                var $window = $(window);
                if ($slider) {
                    $window.resize(function () {
                        if (window.innerWidth < keepOptions.mobileBreakpoint && !$isMobile) {
                            $isMobile = true;
                            $slider.vars.minItems = keepOptions.mobileMinItems;
                            $slider.vars.maxItems = keepOptions.mobileMaxItems;
                            $slider.vars.itemMargin = keepOptions.mobileItemMargin;
                            $slider.flexAnimate(0);
                        } else if (window.innerWidth >= keepOptions.mobileBreakpoint && $isMobile) {
                            $isMobile = false;
                            $slider.vars.minItems = keepOptions.minItems;
                            $slider.vars.maxItems = keepOptions.maxItems;
                            $slider.vars.itemMargin = keepOptions.itemMargin;
                            $slider.flexAnimate(0);
                        }
                    });
                    if (window.innerWidth < keepOptions.mobileBreakpoint && !$isMobile) {
                        $isMobile = true;
                        $slider.vars.minItems = keepOptions.mobileMinItems;
                        $slider.vars.maxItems = keepOptions.mobileMaxItems;
                        $slider.vars.itemMargin = keepOptions.mobileItemMargin;
                        $slider.flexAnimate(0);
                    }
                }
            }
        }
      } else {
        $(this).flexslider();
      }
    });
  }

}(jQuery));

;/*})'"*/
;/*})'"*/
