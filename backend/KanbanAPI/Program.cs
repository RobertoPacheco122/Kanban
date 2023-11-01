global using KanbanAPI.src.Models;
global using KanbanAPI.src.Data;
global using KanbanAPI.src.Services;
global using Microsoft.EntityFrameworkCore;
global using System.Text.Json.Serialization;
using KanbanAPI.src.Repositories.BoardRepository;
using KanbanAPI.src.Services.ListService;
using KanbanAPI.src.Repositories.ListRepository;
using KanbanAPI.src.Services.TaskService;
using KanbanAPI.src.Repositories.TaskRepository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DataContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IBoardService, BoardService>();
builder.Services.AddScoped<IBoardRepository, BoardRepository>();
builder.Services.AddScoped<IListService, ListService>();
builder.Services.AddScoped<IListRepository, ListRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
