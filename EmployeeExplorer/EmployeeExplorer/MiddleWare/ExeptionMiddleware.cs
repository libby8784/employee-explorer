using EmployeeExplorer.Controllers;

namespace EmployeeExplorerAPI.MiddleWare
{
    public class ExeptionMiddleware
    {
        private readonly ILogger<ExeptionMiddleware> _logger;
        private readonly RequestDelegate _request;
       
        public ExeptionMiddleware(ILogger<ExeptionMiddleware> logger, RequestDelegate request)
        {
            _logger = logger;
            _request = request;
        }
        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                _logger.LogInformation("request start", httpContext);
                await _request(httpContext);
                _logger.LogInformation("request end", httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}. Context: {httpContext}");
            }
        }
    }
}
