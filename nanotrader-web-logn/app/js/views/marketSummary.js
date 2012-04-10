/**
 * View Class for the Market Summary
 * @author Carlos Soto <carlos.soto@lognllc.com>
 */
nano.views.MarketSummary = Backbone.View.extend({

    /**
     * Class constructor
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object options:
     * - el: selector for the container
     * - model: nano.models.MarketSummary instance
     * @return void
     */
    initialize : function(options) {
        nano.containers.marketSummary = this.$el;
    },

    /**
     * Sets the model into the object
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object model: Instance of a nano.models Class
     * @return void
     */
    setModel : function(model) {
        this.model = model;
    },

    /**
     * Templating function (inyects data into an HTML Template)
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object data: data to be replaced in the template
     * @return string
     */
    template : _.template(nano.utils.getTemplate(nano.conf.tpls.marketSummary)),

    /**
     * Renders the Market Summary View
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object model: Instance of nano.models.MarketSummary
     * @return void
     */
    render: function(model) {
        if (model)
        {
            this.model = model;
        }
        var marketSummaryTpl = this.template(this.model.toJSON());
        this.$el.html(marketSummaryTpl);

        //Cache the jQuery objects of the MS view
        this.elements = {
            index : this.$('#ms-index'),
            volume : this.$('#ms-volume'),
            change : this.$('#ms-change'),
            changeArrow : this.$('#ms-change-arrow'),
            topGainers : [],
            topLosers : []
        };

        for (var i in this.model.get('topGainers') )
        {
            this.elements.topGainers[i] = {
                symbol : this.$('#ms-tg-sym-' + i),
                price : this.$('#ms-tg-price-' + i),
                change : this.$('#ms-tg-change-' + i)
            };
        }

        for ( i in this.model.get('topLosers') )
        {
            this.elements.topLosers[i] = {
                symbol : this.$('#ms-tl-sym-' + i),
                price : this.$('#ms-tl-price-' + i),
                change : this.$('#ms-tl-change-' + i)
            };
        }
        this.update(this.model);
    },

    /**
     * Updates the Market Summary View with a new model
     * @author Carlos Soto <carlos.soto@lognllc.com>
     * @param Object model: Instance of nano.models.MarketSummary
     * @return void
     */
    update: function(model) {
        this.model = model;

        this.elements.index.html( nano.utils.round(model.get('tradeStockIndexAverage')) );
        this.elements.volume.html( nano.utils.round(model.get('tradeStockIndexVolume')) );
        if ( model.get('percentGain') >= 0 )
        {
            this.elements.change.html( '+' + nano.utils.round(model.get('percentGain')) );
            this.elements.change.removeClass('red-color');
            this.elements.change.removeClass('green-color');
            this.elements.changeArrow.html('&uarr');

        }
        else
        {
            this.elements.change.html( nano.utils.round(model.get('percentGain')) );
            this.elements.change.removeClass('green-color');
            this.elements.change.removeClass('red-color');
            this.elements.changeArrow.html('&darr');
        }

        var topGainers = model.get('topGainers');
        for ( var i in topGainers )
        {
                this.elements.topGainers[i].symbol.html( topGainers[i].symbol );
                this.elements.topGainers[i].symbol.attr('title', topGainers[i].companyname );
                this.elements.topGainers[i].price.html( topGainers[i].price );
                this.elements.topGainers[i].change.html( topGainers[i].change1 );
        }

        var topLosers = model.get('topLosers');
        for ( i in topGainers )
        {
                this.elements.topLosers[i].symbol.html( topLosers[i].symbol );
                this.elements.topLosers[i].symbol.attr('title', topLosers[i].companyname );
                this.elements.topLosers[i].price.html( topLosers[i].price );
                this.elements.topLosers[i].change.html( topLosers[i].change1 );
        }
    }
});