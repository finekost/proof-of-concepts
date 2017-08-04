(function( $ ) {

    $.fn.blendZoom = function() {

      this.animationVendor = 'velocity';
      this.animationProperties = [
                                  'opacity',
                                  'scale'];

      if (!$.fn.velocity) {
        alert('You need a css3 animation vendor like velocity.js')
        this.animationVendor = "animate";
      }

      let config = mapDataAttributes(this);
      applyAnimations(config, this);
    }

    function mapDataAttributes(elem) {
      let ret = {}
      $.each(elem.data(), function(i, v) { ret[i] = v; });
      return ret;
    }

    function applyAnimations(config, elem) {
      $.each( elem.animationProperties, function( key, animationProperty ) {
        if (validateConfig(animationProperty, config))
          animateProperty(animationProperty, config, elem);
        else
          log('read config failed for: ' + animationProperty);
      });
    }

    function animateProperty(aniType, config, elem) {
      elem[elem.animationVendor]({
        [aniType]: [config[aniType + 'Target'], config[aniType + 'Start']],
      },{
          queue: false,
          delay:config[aniType + 'Delay'],
          duration: config[aniType + 'Duration'] }
        );
    }

    function validateConfig(aniType, config) {
      if (config.hasOwnProperty(aniType + 'Start') &&
          config.hasOwnProperty(aniType + 'Target') &&
          config.hasOwnProperty(aniType + 'Delay') &&
          config.hasOwnProperty(aniType + 'Duration'))
          return true;
      return false;
    }

    function log( str ) {
        console.log('fkst-blend-zoom [Error]: ' + str);
    };
})( jQuery );
