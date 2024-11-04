const vRightClick = {
    mounted(el, binding) {
        const menu = binding.value.menu;
        el.oncontextmenu = function (e) {
            e.preventDefault();
            const menuDiv = document.createElement('div');
            menuDiv.style.position = 'fixed';
            menuDiv.style.top = e.clientY + 'px';
            menuDiv.style.left = e.clientX + 'px';
            menuDiv.style.backgroundColor = '#fff';
            menuDiv.style.border = '1px solid #ccc';
            menuDiv.style.padding = '5px';
            menuDiv.style.zIndex = '9999';
            menuDiv.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
            menuDiv.style.display = 'flex';
            menuDiv.style.flexDirection = 'column';
            menu.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.style.padding = '5px';
                menuItem.style.cursor = 'pointer';
                menuItem.innerText = item.name;
                menuItem.onclick = function () {
                    item.fn();
                    menuDiv.remove();
                }
                menuDiv.appendChild(menuItem);
            });
            document.body.appendChild(menuDiv);
        }
        document.addEventListener('click', function () {
            const menuDiv = document.querySelector('div[style*="position: fixed"]');
            if (menuDiv) {
                menuDiv.remove();
            }
        })
    },
}

export default vRightClick