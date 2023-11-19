using EmployeeExplorerAPI.MiddleWare;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//TODO: disable access only to employee explorer app origin
app.UseCors(builder => builder.AllowAnyOrigin());


app.UseMiddleware<ExeptionMiddleware>();

app.Run();

