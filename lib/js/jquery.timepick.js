/*
 http://jelmerdroge.nl/
 Timepicker for jQuery 1.9.1
 Written by Jelmer Dröge March 2013.
*/

//Utility (browser compatibility)
;if (typeof Object.create !== 'function'){
    Object.create = function (obj){
        function F(){}
        F.prototype = obj;
        return new F();
    };
}

(function( $, window, document, undefined ) {

    /**
     * The name of the plugin, change to whatever you want if you have issues with other plugins
     *
     * @type {String}
     */
    var pluginName = 'timepick';

    /**
     * The main plugin Obj
     *
     * @type {Object}
     */
    var Plugin = {
        /**
         * Intialise the plugin
         *
         * @param options
         * @param elem
         */
        init: function(options, elem){
            var self = this;
            self.elem = elem;
            self.$elem = $(elem);

            self.options = $.extend({}, $.fn[pluginName].defaults, options);

            // some properties we use for tracking states
            self.picker = false;

            self.addEventListeners();
        },

        /**
         * Add the eventlisteners for this instance
         */
        addEventListeners: function (){
            var self = this;
            self.$elem.on('click', function(){
                if (self.picker === false){
                    self.create();
                    self.move();
                    self.picker.hide().fadeIn(self.options.animSpeed);
                } else {
                    self.destroy();
                }
            });

            $(document).on('click', function(e){
                if (self.picker != false && e.target != self.picker[0] && e.target != self.elem && !$.contains(self.picker[0], e.target)){
                    self.destroy();
                }
            });
        },

        /**
         * Create the select
         */
        create: function(){
            var self = this,
                picker = $('<div></div>', {
                    class: self.options.prefix + '-popup'
                }),
                selectWrap = $('<div></div>', {
                    class: self.options.prefix + '-select-wrap'
                }),
                hours = this.buildSelect(this.options.hours[0], this.options.hours[1], {class: 'hours'}),
                minutes = this.buildSelect(this.options.minutes[0], this.options.minutes[1], {class: 'minutes'}),
                clear = $('<a></a>', {
                    text: 'Clear',
                    href: 'javascript:void(0);',
                    class: self.options.prefix + '-clear'
                }),
                curVal = this.getValue();

            hours.val(curVal[0]);
            minutes.val(curVal[1]);

            selectWrap.append(hours).append(':').append(minutes);
            picker.append(selectWrap).append(clear);

            picker.on('change', function(){
                var value = hours.val() + ':' + minutes.val();
                self.$elem.val(value);

                //trigger the altField value callback
                if(self.options.altField instanceof jQuery){
                    self.options.altField.val(value);
                }

                //trigger onChange callback
                if (typeof self.options.onChange === 'function'){
                    self.options.onChange(self.getValue());
                }
            });

            clear.on('click', function(){
                self.$elem.val('');
                self.destroy();
            });

            $('body').append(picker);
            this.picker = picker;
        },

        /**
         * Build one select and return the element
         */
        buildSelect: function(from, to, options){
            var val,
                select = $('<select></select>', {
                    class: this.options.prefix + '-' + options.class
                });

            for (var i = from; i <= to; i++){
                val = (new Array(2 + 1 - i.toString().length)).join('0') + i;
                select.append($('<option>', {
                    value: val,
                    text: val
                }));
            }

            return select;
        },

        /**
         * Move the element to the right place
         */
        move: function(){
            if (this.picker !== false){
                var self = this,
                    offset = this.$elem.offset();
                this.picker.offset({
                    top: offset.top + self.$elem.outerHeight(),
                    left: offset.left
                });
            }
        },

        /**
         * Get the value of the input
         */
        getValue: function(){
            return this.$elem.val().split(':');
        },

        /**
         * Removes the element from the DOM
         */
        destroy: function (){
            if (this.picker != false){
                var self = this;
                self.picker.fadeOut(self.options.animSpeed, function(){
                    self.picker.remove();
                    self.picker = false;
                });
            }
        }

    };


    /**
     * Loop over all the elements which have this plugin applied
     *
     * @param options
     * @return {*}
     */
    $.fn[pluginName] = function (options){
        return this.each(function(){
            var picker = Object.create(Plugin);
            picker.init(options, this);
        });
    };

    /**
     * The default options for this plugin
     *
     * @type {Object}
     */
    $.fn[pluginName].defaults = {
        hours: [0,23],          //The range of hours you can can select from
        minutes: [0,59],        //The range of minutes you can select from
        prefix: 'timepick',      //The prefix you would like to use for your css classes
        onChange: null,         //onChange callback
        altField: null,         //Alternate field to change when using this thing
        animSpeed: 200          //FadeIn speed of the popup
    };


})( jQuery, window, document );