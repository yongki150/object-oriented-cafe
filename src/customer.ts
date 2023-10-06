import Barista from "./barista";
import Coffee from "./coffee";
import Menu from "./menu";
import MenuItem from "./menu-item";

export default class Customer {
  private _money: number;
  private _coffee!: Coffee;

  constructor(money: number) {
    this._money = money;
  }

  get money(): number {
    return this._money;
  }

  get coffee(): Coffee {
    return this._coffee;
  }

  private pay(cost: number): void {
    if (this._money >= cost) {
      this._money -= cost;
    } else {
      throw new Error("잔액이 부족합니다.");
    }
  }

  orderCoffee(barista: Barista, menu: Menu): void {
    const menuItem: MenuItem = menu.recommend();

    this.pay(menuItem.price);
    barista.receive(menuItem.price);

    const coffee: Coffee = barista.makeCoffee(menuItem);
    this._coffee = coffee;
  }
}
