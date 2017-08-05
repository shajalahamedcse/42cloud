import { apiPath, proxyPrefix } from 'app/config/api';
import _ from 'lodash';

// return a parsed URL object
const parseURL = (url) => {
  let parser = document.createElement('a');
  parser.href = url;
  return parser;
};

const parseURLPrefix = (data) => {
  let catalog = data.token.catalog;
  let urlPrefix = {};
  catalog.forEach((items) => {
    items.endpoints.forEach((item) => {
      if (item.interface === 'public') {
        urlPrefix[items.type] = parseURL(item.url).pathname
      }
    })
  });
  urlPrefix['monitor'] = '/';
  return urlPrefix;
};

//
const combineIdentityURL = (operation) => {
  let serviceType = apiPath[operation].type;
  return proxyPrefix[serviceType] + apiPath[operation].path;
};

// After Identity Passed.
const combineURL = (operation, tmpl={}) => {
  let serviceType = apiPath[operation].type;
  let urlPrefix = JSON.parse(sessionStorage.getItem('urlPrefix'));
  let url = proxyPrefix[serviceType] +
    urlPrefix[serviceType] +
    apiPath[operation].path;
  return _.template(url)(tmpl);
};

const getToken = () => {
  return localStorage.getItem('scopedToken');
};

const getQueryStatement = (serverID, timeSpan, timeStep) => {
  return {
    monVcpuCoreUsage: `SELECT derivative(mean(value), 1s) / 1000000000 
      FROM collectd.autogen.virt_value 
      WHERE host =~ /^${serverID}$/ 
      AND type = 'virt_vcpu' 
      AND type_instance =~ /.*/ 
      AND time > now() - ${timeSpan} 
      GROUP BY time(${timeStep}), host, type, type_instance`,

    monVcpuTotalUsage: `SELECT derivative(mean(value), 1s) / 1000000000 
      FROM collectd.autogen.virt_value 
      WHERE host =~ /^${serverID}$/ 
      AND type = 'virt_cpu_total' 
      AND type_instance =~ /.*/ 
      AND time > now() - ${timeSpan} 
      GROUP BY time(${timeStep}), host, type, type_instance`,

    monVmemUsage: `SELECT mean(value) 
      FROM collectd.autogen.virt_value 
      WHERE host =~ /^${serverID}$/ 
      AND type = 'memory' 
      AND (type_instance = 'unused' OR type_instance = 'available') 
      AND time > now() - ${timeSpan} 
      GROUP BY time(${timeStep}), host, type, type_instance`
  }

};

export { parseURLPrefix, combineURL, combineIdentityURL, getToken, getQueryStatement };


