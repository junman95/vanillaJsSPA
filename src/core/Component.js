class Component {
  $target;
  state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }

  setup() {}
  template() {
    return "";
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

class App extends Component {
  setup() {
    this.state = { items: ["item1", "item2"] };
  }

  template() {
    const { items } = this.state;
    return `
    <ul>
      ${items
        .map(
          (item, idx) =>
            `<li>${item}<button class='del' id='idx${idx}'>삭제</button></li>`
        )
        .join("")}
    </ul>
    <button class="add">추가</button>
    `;
  }

  setEvent() {
    const { items } = this.state;
    this.$target.querySelector(".add").addEventListener("click", () => {
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });

    items.forEach((_, idx) => {
      this.$target.querySelector(`#idx${idx}`).addEventListener("click", () => {
        const { items } = this.state;
        items.splice(idx, 1);
        this.setState({ items: [...items] });
      });
    });
  }
}
