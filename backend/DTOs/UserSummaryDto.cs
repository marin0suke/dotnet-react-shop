namespace DotnetReactShop.DTOs
{
    public class UserSummaryDto
    {
        public string Id { get; set; } = default!;
        public string Email { get; set; } = default!;
        public IList<string> Roles { get; set; } = new List<string>();
    }
}