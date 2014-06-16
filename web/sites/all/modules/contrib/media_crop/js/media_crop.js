(function($) {
  Drupal.media_crop = {
    /**
     * Container of values for the image crop and scale.
     */
    model: {
      size: {
        // The currently chosen format.
        format: {
          name: ''
        },
        // The current formats resized values (not scaled for to fit the screen).
        scaled: {
          width: '',
          height: ''
        },
        // The size and position of the image's scaled representation on screen.
        current: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
      },
      crop: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        clip: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      },
      rotation: {
        angle: 0
      }
    },
    /**
     * Set top clipping.
     * 
     * @param {int} clip Clipping pixels from top.
     */
    clipTop: function(value) {
      var self = Drupal.media_crop;
      var crop = self.model.crop;
      var image = self.model.size.current;

      value = Math.min(Math.max(value, 0), crop.y + crop.height);
      var newHeight = crop.y + crop.height - value;

      self.setCrop({
        top: value,
        height: newHeight
      });
    },
    /**
     * Set left clipping.
     * 
     * @param {int} value Clipping pixels from the left.
     */
    clipLeft: function(value) {
      var self = Drupal.media_crop;
      var crop = self.model.crop;
      var image = self.model.size.current;

      value = Math.min(Math.max(value, 0), crop.x + crop.width);
      var newWidth = crop.x + crop.width - value;

      self.setCrop({
        left: value,
        width: newWidth
      });
    },
    /**
     * Set right clipping.
     * 
     * @param {int} clip Clipping pixels from the right.
     */
    clipRight: function(value) {
      var self = Drupal.media_crop;
      var crop = self.model.crop;
      var image = self.model.size.current;

      value = Math.min(Math.max(value, 0), image.width - crop.x);
      var newWidth = image.width - crop.x - value;

      self.setCrop({
        width: newWidth
      });
    },
    /**
     * Set bottom clipping.
     * 
     * @param {int} clip Clipping pixels from the bottom.
     */
    clipBottom: function(value) {
      var self = Drupal.media_crop;
      var crop = self.model.crop;
      var image = self.model.size.current;

      value = Math.min(Math.max(value, 0), image.height - crop.y);
      var newHeight = image.height - crop.y - value;

      self.setCrop({
        height: newHeight
      });
    },
    /**
     * Move the clip.
     * 
     * @param {int} dx Move the clip by horizontally by dx pixels.
     * @param {int} dy Move the clip by vertically by dy pixels.
     */
    moveClip: function(dx, dy) {
      var self = Drupal.media_crop;
      var crop = self.model.crop;
      var image = self.model.size.current;

      // Keep crop within bounds of current image size.
      crop.x = Math.min(Math.max(crop.x + dx, 0), image.width - crop.width);
      crop.y = Math.min(Math.max(crop.y + dy, 0), image.height - crop.height);

      self.setCrop({
        left: crop.x,
        top: crop.y
      });
    },
    /**
     * Set the crop width.
     * 
     * @param {int} value
     * @param {string} anchorValue
     */
    setCropWidth: function(value) {
      var self = Drupal.media_crop;
      var crop = self.model.crop;
      var image = self.model.size.current;
      var delta = value - crop.width;
      var anchorValue = $('input:radio[name="data[anchor]"]:checked').val();

      switch (anchorValue) {
        case 'top-left':
        case 'center-left':
        case 'bottom-left':
          crop.width = Math.min(Math.max(value, 0), image.width);
          break;
        case 'top-center':
        case 'center-center':
        case 'right-center':
          crop.x = Math.min(Math.max(crop.x - delta/2, 0), image.width);
          crop.width = Math.min(Math.max(value, 0), image.width);
          // Keep x within bounds.
          crop.x -= Math.max(crop.x + crop.width - image.width, 0);
          break;
        case 'top-right':
        case 'center-right':
        case 'bottom-right':
          crop.x = Math.min(Math.max(crop.x - deltaW, 0), image.width);
          crop.width = Math.min(Math.max(value, 0), crop.width);
          break;
      }

      self.setCrop({
        left: crop.x,
        width: crop.width
      });
    },
    /**
     * Set the crop height.
     * 
     * @param {int} value
     */
    setCropHeight: function(value) {
      var self = Drupal.media_crop;
      var crop = self.model.crop;
      var image = self.model.size.current;
      var delta = value - crop.height;
      var anchorValue = $('input:radio[name="data[anchor]"]:checked').val();

      switch (anchorValue) {
        case 'top-left':
        case 'top-center':
        case 'top-right':
          crop.height = Math.min(Math.max(value, 0), image.height);
          break;
        case 'center-left':
        case 'center-center':
        case 'center-right':
          crop.y = Math.min(Math.max(crop.y - delta / 2, 0), image.height);
          crop.height = Math.min(Math.max(value, 0), image.height);
          // Keep y within bounds.
          crop.y -= Math.max(crop.y + crop.height - image.height, 0);
          break;
        case 'bottom-left':
        case 'bottom-center':
        case 'bottom-right':
          crop.y = Math.min(Math.max(crop.y - delta, 0), image.height);
          crop.height = Math.min(Math.max(value, 0), image.height);
          break;
      }

      self.setCrop({
        top: crop.y,
        height: crop.height
      });
    },
    /**
     * Set current width of image.
     * 
     * @param {int} value
     */
    setScaleWidth: function(value) {
      var self = Drupal.media_crop;
      var image = self.model.size.current;
      var scaled = self.model.size.scaled;
      var crop = self.model.crop;

      if (value > 0) {
        // Calculate new scale.
        var scale_x = value / scaled.width;
        scaled.width = value;
        // Calculate sizes.
        crop.x *= scale_x;
        crop.width *= scale_x;
        image.width *= scale_x;

        self.view.update();

        self.setCrop({
          top: crop.y,
          left: crop.x,
          width: crop.width,
          height: crop.height
        });
      }
    },
    /**
     * Set current width of image.
     * 
     * @param {int} value
     */
    setScaleHeight: function(value) {
      var self = Drupal.media_crop;
      var image = self.model.size.current;
      var scaled = self.model.size.scaled;
      var crop = self.model.crop;

      if (value > 0) {
        // Calculate new scale.
        var scale_y = value / scaled.height;
        scaled.height = value;
        // Calculate sizes.
        crop.y *= scale_y;
        crop.height *= scale_y;
        image.height *= scale_y;

        self.view.update();

        self.setCrop({
          top: crop.y,
          left: crop.x,
          width: crop.width,
          height: crop.height
        });
      }
    },
    /**
     * Reset cropping.
     * Used when switching between styles.
     */
    resetCrop: function() {
      var self = Drupal.media_crop;
      var current = self.model.size.current;
      
      self.setCropWidth(current.width);
      self.setCropHeight(current.height);
    },
    /**
     * Set crop of image.
     * 
     * @param {Object} params The parameter of the crop, e.g. ({left: 10, width: 100}).
     */
    setCrop: function(params) {
      var self = Drupal.media_crop;
      var image = self.model.size.current;
      var scaled = self.model.size.scaled;
      var fields = self.controls;
      var crop = self.model.crop;

      var scale_x = scaled.width / image.width;
      var scale_y = scaled.height / image.height;

      // Direct the parameters to the right fields.
      for (var key in params) {
        switch (key) {
          case 'left':
            fields.set(fields.$x, Math.round(params[key] * scale_x));
            if (!params['width']) {
              fields.set(fields.$r, Math.round((image.width - crop.width - params[key]) * scale_x));
            }
            break;
          case 'top':
            fields.set(fields.$y, Math.round(params[key] * scale_y));
            if (!params['height']) {
              fields.set(fields.$b, Math.round((image.height - crop.height - params[key]) * scale_y));
            }
            break;
          case 'width':
            fields.set(fields.$w, Math.round(params[key] * scale_x));
            fields.set(fields.$r, Math.round((image.width - params[key] - (params['left'] ? params['left'] : 0)) * scale_x));
            break;
          case 'height':
            fields.set(fields.$h, Math.round(params[key] * scale_y));
            fields.set(fields.$b, Math.round((image.height - params[key] - (params['top'] ? params['top'] : 0)) * scale_y));
            break;
        }
      }

      self.view.setCrop(params);
    },
    /**
     * Collection of elements and controllers for the text and button input.
     */
    controls: {
      /**
       * Set the value of a textfield.
       * 
       * @param {jQuery element} $field
       * @param {int} value
       */
      set: function($field, value) {
        var self = Drupal.media_crop.controls;
        if ($field.is(':not(:focus)')) {
          // Set a timeout for each field so we don't write double to it.
          var name = $field.attr('name');
          self[name] = self[name] || {};
          if (self[name]) {
            clearTimeout(self[name].timeout);
          }
          self[name].timeout = setTimeout(function() {
            $field.val(value);
          }, 10);
        }
      },
      /**
       * Force set a value of a textfield (without respect of element focus).
       * 
       * @param {jQuery element} $field
       * @param {int} value
       */
      force: function($field, value) {
        $field.val(value);
      },   
      /**
       * Function that handles keyboard keyup events for the textfields.
       * 
       * @param {KeyboardEvent} e
       */
      keyup: function(e) {
        var self = Drupal.media_crop;
        var image = self.model.size.current;
        var scaled = self.model.size.scaled;
        var crop = self.model.crop;

        // Get the value of the current textfield.
        var $textfield = $(e.target);
        var name = $textfield.attr('name');
        var value = $textfield.val();
        var value = /([\d]+)/.test(value) ? parseInt(value) : 0;

        // Get the char for the key pressed.
        var key = String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105)? e.keyCode-48 : e.keyCode);

        // Key up or down to change the value (shift key makes it quicker).
        if (e.keyCode === 38) { // UP.
          e.preventDefault();
          value += e.shiftKey ? 10 : 1;
          $textfield.val(value);
        }
        else if (e.keyCode === 40) { // DOWN.
          e.preventDefault();
          value -= e.shiftKey ? 10 : 1;
          $textfield.val(value);
        }

        // Calculate the scales.
        var scale_x = image.width / scaled.width;
        var scale_y = image.height / scaled.height;

        // If the value for the field is the right format and the right key was pressed.
        if (/([\d]+)/.test(value) && (/([\d]+)/.test(key) || $.inArray(e.keyCode, [8, 38, 40, 93, 127]) >= 0)) {
          switch (name) {
            case 'crop_y':
              self.clipTop(value * scale_y);
              break;
            case 'crop_x':
              self.clipLeft(value * scale_x);
              break;
            case 'clip_right':
              self.clipRight(value * scale_x);
              break;
            case 'clip_bottom':
              self.clipBottom(value * scale_y);
              break;
            case 'crop_w':
              if (self.controls.$keep_crop_aspect_ratio.is(':checked')) {
                var aspect_ratio = crop.height / crop.width;
                self.setCropHeight(aspect_ratio * value * scale_x);
              }
              self.setCropWidth(value * scale_x);
              // Keep value within bounds.
              var bounded = Math.min(Math.max(value, 0), scaled.width);
              if (bounded !== value) {
                self.controls.force(self.controls.$w, Math.round(bounded));
              }
              break;
            case 'crop_h':
              if (self.controls.$keep_crop_aspect_ratio.is(':checked')) {
                var aspect_ratio = crop.width / crop.height;
                self.setCropWidth(aspect_ratio * value * scale_x);
              }
              self.setCropHeight(value * scale_y);
              // Keep value within bounds.
              var bounded = Math.min(Math.max(value, 0), scaled.height);
              if (bounded !== value) {
                self.controls.force(self.controls.$h, Math.round(bounded));
              }
              break;
            case 'crop_scale_w':
              if (self.controls.$keep_scale_aspect_ratio.is(':checked')) {
                var aspect_ratio = image.height / image.width;
                self.setScaleHeight(aspect_ratio * value);
              }
              self.setScaleWidth(value);
              break;
            case 'crop_scale_h':
              if (self.controls.$keep_scale_aspect_ratio.is(':checked')) {
                var aspect_ratio = image.width / image.height;
                self.setScaleWidth(aspect_ratio * value);
              }
              self.setScaleHeight(value);
              break;
          }
        }
      },
      /**
       * Function that handles select events for the image style selector.
       * 
       * @param {Event} e
       */
      select: function(e) {
        var self = Drupal.media_crop;
        var name = self.controls.$select.val();
        var image = self.model.size.current;
        var scaled = self.model.size.scaled;
        var settings = Drupal.settings.media_crop_defaults[name];
        self.resetCrop();

        self.model.size.format.name = name;
        for(var setting in settings) {
          switch(setting) {
            case 'crop_scale_w':
              self.setScaleWidth(settings[setting]);
              break;
            case 'crop_scale_h':
              self.setScaleHeight(settings[setting]);
              break;
            case 'crop_w':
              var scale_x = scaled.width / image.width;
              self.setCropWidth(settings[setting] / scale_x);
              break;
            case 'crop_h':
              var scale_y = scaled.height / image.height;
              self.setCropHeight(settings[setting] / scale_y);
              break;
          }
        }
      },
      /**
       * Update the controls values from the model.
       */
      update: function() {
        var self = Drupal.media_crop;
        var image = self.model.size.current;
        var scaled = self.model.size.scaled;
        
        self.controls.set(self.controls.$scale_w, Math.round(scaled.width));
        self.controls.set(self.controls.$scale_h, Math.round(scaled.height));

        // Update the scale view of the current scale in the view.
        self.controls.$scaleField.val(Math.round((image.height / scaled.height) * 100));
      }
    },
    /**
     * Collection of elements and controllers for the image view.
     */
    view: {
      /**
       * Handle dragging of crop handles in the view.
       * 
       * @param {MouseEvent} e
       */
      dragging: function(e) {
        e.preventDefault();
        var self = Drupal.media_crop;
        var image = self.model.size.current;

        if (self.view.imageLoaded) {
          // Filter out the first handle that is being dragged.
          var $controls = self.view.$controlHandles.filter('.dragging').eq(0);
          $controls.each(function(i, el) {
            var $control = $(el);

            // Calculate the position of the mouse event relative to the image.
            var x = e.pageX - image.x;
            var y = e.pageY - image.y;

            // Determine which handle is being dragged.
            var controlPos = /crop-([\w-]+)/.exec($control.attr('class'));
            if (controlPos.length > 0) {
              switch (controlPos[1]) {

                case 'top-left':
                  self.clipLeft(x);
                  self.clipTop(y);
                  break;

                case 'top-right':
                  self.clipTop(y);
                  self.clipRight(image.width - x);
                  break;

                case 'bottom-right':
                  self.clipBottom(image.height - y);
                  self.clipRight(image.width - x);
                  break;

                case 'bottom-left':
                  self.clipBottom(image.height - y);
                  self.clipLeft(x);
                  break;

                case 'controls':
                  var dx = e.pageX - self.view.x0;
                  var dy = e.pageY - self.view.y0;

                  self.moveClip(dx, dy);

                  self.view.x0 = e.pageX;
                  self.view.y0 = e.pageY;
                  break;
              }
            }
          });
        }
      },
      /**
       * Stop handle of crop and store temporary values.
       */
      stop: function() {
        var self = Drupal.media_crop;
        var crop = self.model.crop;

        self.view.$controlHandles.removeClass('dragging');
        crop.x = parseInt(self.view.$cropControls.css('left'));
        crop.y = parseInt(self.view.$cropControls.css('top'));
        crop.width = parseInt(self.view.$cropControls.css('width'));
        crop.height = parseInt(self.view.$cropControls.css('height'));
      },
      /**
       * Update view.
       */
      update: function() {
        var self = Drupal.media_crop;
        var image = self.model.size.current;

        // Update sizing of the image.
        self.view.$image.width(image.width);
        self.view.$image.height(image.height);

        self.view.scaleToFit();
      },
      /**
       * Scale image to fit within the outer container.
       */
      scaleToFit: function() {
        var self = Drupal.media_crop;
        var image = self.model.size.current;
        var crop = self.model.crop;
        var scaled = self.model.size.scaled;

        // Scale image so it fits inside the media-item container but without any upscaling.
        var fillScaleWidth = Math.min(scaled.width, self.view.imageMaxWidth) / image.width;
        var fillScaleHeight = Math.min(scaled.height, self.view.imageMaxHeight) / image.height;

        // Scale the image by the side that is limiting first.
        var minFillScale = Math.min(fillScaleWidth, fillScaleHeight);

        // Scale to fit container.
        image.width *= minFillScale;
        image.height *= minFillScale;
        crop.x *= minFillScale;
        crop.y *= minFillScale;
        crop.width *= minFillScale;
        crop.height *= minFillScale;
        
        self.view.$image.width(image.width);
        self.view.$image.height(image.height);
        
        // Center picture.
        if (self.view.imageMaxHeight - image.height >= 0) {
          self.view.$cropping.css({
            top: (self.view.imageMaxHeight - image.height) / 2
          });
        }

        // Update starting points for the crop controls.
        image.x = self.view.$cropControls.offset().left;
        image.y = self.view.$cropControls.offset().top;
        
        // Update controls (especially for the new scale in the view).
        self.controls.update();
      },
      /**
       * Set crop parameters of image.
       * 
       * @param {object} params CSS parameters to pass to the handle.
       */
      setCrop: function(params) {
        var self = Drupal.media_crop;
        self.view.$handle.css(params);
      }
    }
  };

  /**
   * Attach behaviors of crop handles, such as the edge crop handles.
   */
  Drupal.behaviors.media_crop_handles = {
    attach: function(context) {
      var self = Drupal.media_crop;
      var view = self.view;
      var image = self.model.size.current;
      var crop = self.model.crop;

      // Locate the image.
      view.$image = $('.media-item img', context);

      // Wrap the image so if we scale it bigger than the container its hidden.
      view.$wrapper = $("<div class='image-wrapper'></div>");
      view.$image.wrap(view.$wrapper);
      view.$image.after("<div class='border-bottom'></div>");


      // Add cropping container wrapping around the image and controls.
      view.$image.wrap("<div class='cropping'></div>");
      view.$cropping = view.$image.parent();

      // Create a wrapper for the crop controls.
      view.$cropControls = $("<div class='crop crop-controls'></div>");

      // Create cropping controls.
      view.$cropControls.append("<div class='crop crop-top-left'></div>");
      view.$cropControls.append("<div class='crop crop-top-right'></div>");
      view.$cropControls.append("<div class='crop crop-bottom-left'></div>");
      view.$cropControls.append("<div class='crop crop-bottom-right'></div>");

      // Add the crop controls before the image.
      view.$image.before(view.$cropControls);

      // Create a cover container wrapping around the covers.
      view.$coversWrapper = $("<div class='covers-wrapper'></div>");
      view.$covers = $("<div class='covers'></div>");
      view.$coversWrapper.append(view.$covers);

      // Create crop covers.
      view.$covers.append("<div class='cover cover-top'></div>");
      view.$covers.append("<div class='cover cover-right'></div>");
      view.$covers.append("<div class='cover cover-left'></div>");
      view.$covers.append("<div class='cover cover-bottom'></div>");

      // Add the covers before the image.
      view.$image.before(view.$coversWrapper);

      // Retain the max-sizes of the container.
      view.$media_item = view.$cropping.closest('.media-item');
      view.imageMaxWidth = view.$media_item.width();
      view.imageMaxHeight = view.$media_item.height();

      // Wait until the image is loaded to calculate the image parameters.
      view.imageLoaded = false;
      view.$image.load(function() {
        crop.width = image.width = view.$image.width();
        crop.height = image.height = view.$image.height();

        // Scale image to fit window.
        view.scaleToFit();

        // Update view.
        self.view.update();
        view.imageLoaded = true;
      });

      // Gather controls and cover in one handle.
      view.$handle = $('').add(view.$covers).add(view.$cropControls);

      // Gather crop corners and box in one handle.
      view.$controlHandles = $('.crop', view.$cropControls.parent()).reverse();

      // Add listeners to the cropping handles.
      view.$controlHandles.each(function(i, el) {
        var $control = $(el);
        $control.mousedown(function(e) {
          if (view.imageLoaded) {
            // Start dragging.
            view.x0 = e.pageX;
            view.y0 = e.pageY;
            $control.addClass('dragging');
          }
        }).mousemove(view.dragging).mouseup(view.stop).bind('contextmenu', view.stop);
      });

      // Add listeners to the window when dragging quickly.
      $(window).mousemove(view.dragging).mouseup(view.stop);
    }
  };

  /**
   * Attach behaviors of crop controls, such as the crop size width textfield.
   */
  Drupal.behaviors.media_crop_controls = {
    attach: function(context) {
      var self = Drupal.media_crop;
      var controls = Drupal.media_crop.controls;
      var format = self.model.size.format;
      var image = self.model.size.current;
      var scaled = self.model.size.scaled;

      // Grab a handle to the crop values.
      controls.$form = $('#media-format-form', context);

      // Get handles for each input.
      controls.$x = $('input#edit-crop-x', controls.$form);
      controls.$y = $('input#edit-crop-y', controls.$form);
      controls.$w = $('input#edit-crop-w', controls.$form);
      controls.$h = $('input#edit-crop-h', controls.$form);
      controls.$r = $('input#edit-clip-right', controls.$form);
      controls.$b = $('input#edit-clip-bottom', controls.$form);
      
      // Add listeners for the keep aspect ratio selector.
      controls.$keep_scale_aspect_ratio = $('input#edit-maintain-scale-aspect-ratio', controls.$form);
      controls.$keep_crop_aspect_ratio = $('input#edit-maintain-crop-aspect-ratio', controls.$form);
      
      
      // Create the image crop size anchor selector.
      controls.$cropSizeWrapper = $('#edit-crop .fieldset-wrapper', controls.$form);
      controls.$anchor = $('<div class="image-anchor"></div>');
      var anchorItems = [
        'top-left', 'top-center', 'top-right',
        'center-left', 'center-center', 'center-right',
        'bottom-left', 'bottom-center', 'bottom-right'
      ];
      for (var i in anchorItems) {
        var $anchorRadio = $('<input type="radio" name="data[anchor]" value="' + anchorItems[i] + '" id="anchor-' + anchorItems[i] + '">');
        controls.$anchor.append($anchorRadio);
        $anchorRadio.after('<i class="overlay"></i>');
        if (i == 4) {
          $anchorRadio.attr('checked', 'checked');
        }
      }
      controls.$cropSizeWrapper.prepend(controls.$anchor);

      // Calculate the inital scale of the image.
      controls.$scale_w = $('input#edit-crop-scale-w');
      controls.$scale_h = $('input#edit-crop-scale-h');
      scaled.width = format.width = parseInt(controls.$scale_w.val());
      scaled.height = format.height = parseInt(controls.$scale_h.val());

      // Create a label that displays the current scale of the image.
      controls.$scaleField = $('<input type="text" name="scale" size="2">');
      controls.$scaleContainer = $('<div class="scale"></div>').append(controls.$scaleField);
      controls.$scaleField.attr('disabled', 'disabled');
      self.view.$cropping.before(controls.$scaleContainer);

      // Bind to all textfield inputs we manage.
      controls.$inputs = $('input', controls.$form).add(controls.$scaleLabel);
      controls.$inputs.bind('keyup', controls.keyup).bind('blur', function() {
        self.view.stop();
        // @todo: Correct values according to limits.
      });
      
      controls.$select = $('select#edit-image-style');
      controls.$select.bind('change', controls.select);
    }
  };
  
  // Store original Drupal.media.formatForm.getOptions() for extending.
  var getOptions = Drupal.media.formatForm.getOptions;

  // Extend Drupal.media.formatForm.getOptions() to incorporate media_crop
  // related settings.
  Drupal.media.formatForm.getOptions = function (context) {
    var options = getOptions();

    var mediaCropSettings = {
      media_crop_x: Number(($('input[name=crop_x]', context).val() || '0')),
      media_crop_y: Number(($('input[name=crop_y]', context).val() || '0')),
      media_crop_w: Number(($('input[name=crop_w]', context).val() || '0')),
      media_crop_h: Number(($('input[name=crop_h]', context).val() || '0')),
      media_crop_scale_w: Number(($('input[name=crop_scale_w]', context).val() || '0')),
      media_crop_scale_h: Number(($('input[name=crop_scale_h]', context).val() || '0')),
      media_crop_image_style: getImageStyle(context),
      media_crop_instance: '%7BMCIID%7D'
    };

    return $.extend({}, options, mediaCropSettings);
  };

  // Store original Drupal.media.formatForm.getFormattedMedia(),
  // if extending it is needed instead of overriding.
  var getFormattedMedia = Drupal.media.formatForm.getFormattedMedia;
  // Override Drupal.media.formatForm.getFormattedMedia(),
  // it is safe to do, as this js gets loaded only for local images.

  Drupal.media.formatForm.getFormattedMedia = function (context) {
    
    var formatType = ($('input[name=image_style]', context).val() || 'media_crop');
    var options = Drupal.media.formatForm.getOptions(context);
    var token = ($('input[name=token]', context).val() || ' ');
    var template = ($('input[name=template]', context).val() || '');
    var fid = ($('input[name=fid]', context).val() || '0');

    var r = Math.random() * 10000000000000;
    var id = 'media_crop_' + String(r - (r % 1));

    var replacedData = {
      id: id,
      token: token,
      options: options,
      fid: fid
    };

    parent.window.Drupal.media_crop.replaceImage(replacedData);

    var mediadata = {
      type: formatType,
      options: options,
      html: Drupal.settings.media_crop.imageStyleHtml[options.media_crop_image_style]
    };

    mediadata.html = template.replace('ID_PLACEHOLDER', id);

    return mediadata;
  };

  var getImageStyle = function (context) {
    return ($('select[name=image_style] option:selected', context).val() || '');
  };

  // Add functionality to reverse a jQuery collections.
  $.fn.reverse = [].reverse;
})(jQuery);
