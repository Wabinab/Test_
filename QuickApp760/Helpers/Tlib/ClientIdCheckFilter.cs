using System;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
// using NbtQo.Collections;

namespace Helpers.Tlib
{
    //-CF181218: Action filter for IP restriction
    public class ClientIdCheckFilter : ActionFilterAttribute
    {
        private readonly ILogger _logger;
        private readonly string _safelist;
        private readonly IWebHostEnvironment _hostingEnv;
        private readonly IHubContext<ActHub> _hubContext;

        public ClientIdCheckFilter
            (ILoggerFactory loggerFactory, IConfiguration configuration, IWebHostEnvironment hostingEnvironment, IHubContext<ActHub> hubContext)
        {
            _logger = loggerFactory.CreateLogger("ClientIdCheckFilter");
            //_safelist = configuration["AdminSafeList"];
            _hostingEnv = hostingEnvironment;
            _hubContext = hubContext;
        }


        public override void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation(
                $"Remote IpAddress: {context.HttpContext.Connection.RemoteIpAddress}");

            var remoteIp = context.HttpContext.Connection.RemoteIpAddress;
            _logger.LogDebug($"Request from Remote IP address: {remoteIp}");

            //-log info
            var userId = context.HttpContext.User.Identity.Name;
            var userAgent=context.HttpContext.Request.Headers["User-Agent"].ToString();
            var referer = context.HttpContext.Request.Headers["Referer"].ToString();
            var queryStr = $"{context.HttpContext.Request.Path}{context.HttpContext.Request.QueryString}";

            var shortAgent = GetShortUserAgent(userAgent);
            //_ = _nbtQoColl.UpdActlogAsync(userId, null, remoteIp.ToString(), shortAgent, referer, queryStr);
            //_hubContext.Clients.All.SendAsync("ScAttend.Actlog", DateTime.Now,new { userId, shortAgent});

            //var logData =remoteIp+"|"+userId;
            //FilterLog(context.HttpContext,logData);  //-CF201222: log to database instead


            //string[] ip = _safelist.Split(';');
            //var bytes = remoteIp.GetAddressBytes();
            //var badIp = true;
            //foreach (var address in ip)
            //{
            //    var testIp = IPAddress.Parse(address);
            //    if (testIp.GetAddressBytes().SequenceEqual(bytes))
            //    {
            //        badIp = false;
            //        break;
            //    }
            //}

            //if (badIp)
            //{
            //    _logger.LogInformation(
            //        $"Forbidden Request from Remote IP address: {remoteIp}");
            //    context.Result = new StatusCodeResult(401);
            //    return;
            //}

            base.OnActionExecuting(context);
        }

        private string GetShortUserAgent(string userAgent)
        {
            var start = userAgent.IndexOf("(");
            var end = userAgent.IndexOf(")");
            if (start>-1 && end>-1 && end > start) return userAgent?.Substring(start+1, end-start-1);
            return userAgent;
        }

        private void FilterLog(HttpContext context, string logData)
        {
            if (context.Request.Path.Value.Contains("img")) return;

            var savePath = _hostingEnv.ContentRootPath;
            var now = DateTime.Now; // DateTime.UtcNow;
            var fileName = $"filter-{now.ToString("yyyyMMdd")}.log";
            var filePath = Path.Combine(savePath, "logs\\filter");

            //-ensure directory exist
            System.IO.Directory.CreateDirectory(filePath);

            // Write to file
            try
            {
                using (StreamWriter writer = new StreamWriter(Path.Combine(filePath, fileName), true))
                {
                    writer.WriteLine($"{now.ToString("HH:mm:ss")} {context.Request.Path}{context.Request.QueryString}");
                    writer.WriteLine(logData);
                }
            }
            catch { }
       }
    }
}



//-----Require configure the followings:------
//public void ConfigureServices(IServiceCollection services)
//{
//    services.AddScoped<ClientIdCheckFilter>();

//    services.AddMvc(options =>
//    {
//        options.Filters.Add
//            (new ClientIdCheckPageFilter
//                (_loggerFactory, Configuration));
//    }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
//}
//
//
//[ServiceFilter(typeof(ClientIdCheckFilter))]
//[HttpGet]
//public IEnumerable<string> Get()