namespace DotnetReactShop.Tests;

public class UnitTest1
{
    [Fact]
    public void BasicAddition_Works()
    {
        //arrange
        int a = 2;
        int b = 3;

        //act
        int sum = a + b;

        //assert
        Assert.Equal(5, sum);
    }
}