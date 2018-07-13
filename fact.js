function Fact(){
    this.fact = this.randomFact();
    this.text = this.fact[0];
    this.source = this.fact[1];
}

Fact.prototype.collection = function () {
    var fact1 = ['At least 8 million tons of plastic enter the oceans each year.', 'ecowatch.com'];
    var fact2 = ['There is more microplastic in the ocean than there are stars in the Milky Way.', 'ecowatch.com'];
    //var fact3 = ['322 million tons of plastic were produced in 2015—the same weight as 900 Empire State Buildings.', 'ecowatch.com'];
    var fact4 = ['More than 50 percent of sea turtles have consumed plastic.', 'ecowatch.com'];
    var fact5 = ['By 2050 there will be more plastic in the oceans than fish in weight.', 'earthday.org'];
    var fact6 = ['Every minute, one garbage truck of plastic is dumped into our oceans.', 'earthday.org'];
    //var fact7 = ['Over the last ten years we have produced more plastic than during the whole of the last century.','ecowatch.com'];
    var fact8 = ['50 percent of the plastic we use, we use just once and throw away.','ecowatch.com'];
    var fact9 = ['Enough plastic is thrown away each year to circle the earth four times.','ecowatch.com'];
    var fact10 = ['We currently recover only 5% of the plastics we produce.','ecowatch.com'];
    var fact11 = ['More than one million bags are used every minute.','ecowatch.com'];
    var fact12 = ['It takes 500-1,000 years for plastic to degrade.','ecowatch.com'];
    var fact13 = ["Plastic constitutes approximately 90 percent of all trash floating on the ocean's surface.",'ecowatch.com'];
    //var fact14 = ['One million sea birds and 100,000 marine mammals are killed annually from plastic in our oceans.','ecowatch.com'];
    var fact15 = ['160,000 plastic bags are used globally every second.','theworldcounts.com'];
    var fact16 = ['An average family will use 60 plastic bags on four visits to the supermarket.','theworldcounts.com'];
    var fact17 = ['Only 1 to 3% of plastic bags are recycled worldwide.','theworldcounts'];
    var fact18 = ['In the North Pacific Ocean, there are 6x more plastic debris than plankton.','theworldcounts.com'];
    var fact19 = ['40 percent of plastic produced is packaging, used just once and then discarded.','nationalgeographic.com'];
    var fact20 = ['Over 44% of all seabirds have ingested or become entangled in plastic.','nationalgeographic.com'];
    var fact21 = ['The average time that a plastic bag is used for is 12 minutes.','nationalgeographic.com'];
    return [fact1, fact2, fact4, fact5, fact6, fact8, fact9, fact10, fact11, fact12, fact13, fact15, fact16, fact17, fact18, fact19, fact20, fact21];
}

Fact.prototype.randomFact = function () {
    var collection = this.collection();
    return collection[Math.floor(Math.random()*collection.length)];
}