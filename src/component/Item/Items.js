import Component from "../../core/Component.js";

export default class Items extends Component {
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
                  `<li>
                    ${item}
                    <button class='deleteBtn' data-index=${idx}>
                      삭제하기
                    </button>
                  </li>`
              )
              .join("")}
            </ul>
            <button class='addBtn'>추가</button>
        `;
  }

  setEvent() {
    this.$target.addEventListener("click", ({ target }) => {
      const items = [...this.state.items];
      if (target.classList.contains("addBtn")) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }
      if (target.classList.contains("deleteBtn")) {
        console.log(target.dataset.index);
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }
    });
  }
}
