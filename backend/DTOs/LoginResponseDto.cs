using System.Collections.Generic;

namespace DotnetReactShop.DTOs
{
    public class LoginResponseDto : UserDto
    {
        public string Token { get; set; }
    }
}