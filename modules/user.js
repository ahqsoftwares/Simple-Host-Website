let users = {};
module.exports = {
         /**
          * Set ip to db
          * @param {String} ip 
          * @param {*} data 
          */
         set: function(ip, data) {
                  users[ip] = data;
         },
         /**
          * Get Ip from db
          * @param {String} ip 
          * @returns 
          */
         get: function(ip) {
                  return users[id] || null;
         }
}