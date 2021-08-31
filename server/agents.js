let onlineAgents =  [];
let onlineCustomer = [];
let browsingCustomers = [];
let queuedCustomers = [];
let loggedInClients = [];

const filterState = (client)=>{
    onlineAgents = onlineAgents.filter(agent => agent.socketId != client.id)
    browsingCustomers = browsingCustomers.filter(customer => customer.socketId != client.id)
    queuedCustomers = queuedCustomers.filter(customer => customer.socketId != client.id) 
    loggedInClients =  loggedInClients.filter(customer => customer.socketId != client.id)
}
 

module.exports = {
    setOnlineAgents:(item)=>{
        onlineAgents.push(item)
    },
    getOnlineAgents: function() {
     return onlineAgents
    },
    setOnlineCustomer:(item)=>{
        onlineCustomer.push(item)
    },
    getOnlineCustomer: function() {
     return onlineCustomer
    },

    setBrowsingCustomers:(item)=>{
        browsingCustomers.push(item)
    },
    getBrowsingCustomers: function() {
     return browsingCustomers
    },
    setQueuedCustomers: function(item){
        queuedCustomers.push(item)
    },
    getQueuedCustomers: function() {
        return queuedCustomers
       },

    setLoggedInClients: function(item){
        loggedInClients.push(item)
    },
    getLoggedInClients: function() {
        return loggedInClients
       },
       filterState 
}