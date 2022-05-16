const UploadTime = function(UploadTime) {
  time = UploadTime.toLowerCase()
  switch (time) {
      case time = "1h":
        results = "EgIIAQ%253D%253D"  
        break;
        case time = "1d":    
        results = "EgIIAg%253D%253D"      
        break;
        case time = "1w":    
        results = "EgIIAw%253D%253D"      
        break;
        case time = "1m":    
        results = "EgIIBA%253D%253D"      
        break;
        case time = "1y":    
        results = "EgIIBQ%253D%253D"      
        break;
      default:
        //default 1h (one hour)
          results = "EgIIAQ%253D%253D";
  }
  return results;
}

module.exports = {
  UploadTime
}