using Chat_API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PusherServer;
using System.Net;
using System.Threading.Tasks;

namespace Chat_API.Controllers
{
    [Route(template:"api")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        
        [HttpPost(template:"messages")]
        public async Task<IActionResult> Message(MessageDTO dto)
        {
            var options = new PusherOptions
            {
                Cluster = "ap2",
                Encrypted = true
            };

            var pusher = new Pusher(
              "1663355",
              "9516408a2d0b8d86257e",
              "5ad27b19eb42100edd4c",
              options);

            var result = await pusher.TriggerAsync(
              "my-channel",
              "my-event",
              new { username = dto.username, message = dto.message});

            return Ok(new string[] {});
        }
    }
}
