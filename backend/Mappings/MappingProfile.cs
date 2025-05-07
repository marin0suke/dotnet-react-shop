
using AutoMapper;
using DotnetReactShop.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Order, OrderDto>(); // retrieving existing order (back to front)

        CreateMap<OrderItem, OrderItemDto>(); // retrieving existing order (back to front)

        CreateMap<OrderSubmissionDto, Order>(); // submitting order. (front to back)

        CreateMap<OrderItemDto, OrderItem>(); // to convert items on submission. (front to back)

        CreateMap<UpdateOrderDto, Order>(); // updating (front to back)

        CreateMap<ApplicationUser, LoginResponseDto>()
            .ForMember(dest => dest.Token, opt => opt.Ignore()); // mapping user to login response dto
    }
}