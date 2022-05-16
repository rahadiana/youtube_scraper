const GetQuery = function(query) {
    let BeforeText = 'var ytInitialData =';
    let AfterText = '};<';
    let Text = ' ' + query;
    let This = Text.indexOf(BeforeText);
    if (This == 0) return '';
    This += BeforeText.length;
    RangeText = Text.indexOf(AfterText, This) - This;
    let ResGetQuery = Text.substr(This, RangeText+1);
 
   return ResGetQuery;
 }
 
 module.exports = {
   GetQuery
 }