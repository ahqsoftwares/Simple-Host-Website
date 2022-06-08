let users = {};
module.exports = {
         /**
          * Set ip to db
          * @param {String} ip 
          * @param {*} data 
          */
         set: function(ip, data) {
                  users[ip] = data;
                  console.log(data.info);
         },
         /**
          * Get Ip from db
          * @param {String} ip 
          * @returns 
          */
         get: function(ip) {
                  return users[ip] || null;
         },
         /**
          * Destroy session
          * @param {String} ip
          * @returns {Boolean} Success
          */
         destroy: async function(ip) {
                  delete users[ip];
                  return true;
         }
}