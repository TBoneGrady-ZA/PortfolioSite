const menuBtn = document.getElementById('menuBtn');
const pagenMenu = document.getElementById('menuBtn2');
const menu = document.getElementById('menu');
const mail = document.getElementById('mail');

mail.onclick = function () {
    let ans =  window.prompt("Would you like to see my email? \n" + '("yes" or "no")');
    let text

    if (ans == "yes") {
        text = window.alert("raymond.kenney.za@gmail.com")
    }else {
        text = window.confirm("Have a great day!")
    }
}

menuBtn.onclick = function () {
    menu.classList.toggle('gone')
}

menuBtn2.onclick = function () {
    menu.classList.toggle('gone')
    }

    // Chat Bot

    class Chatbox {
        constructor() {
            this.args = {
                openButton: document.querySelector('.chatbox__button'),
                chatBox: document.querySelector('.chatbox__support'),
                sendButton: document.querySelector('.send__button')
            }
    
            this.state = false;
            this.messages = [];
        }
    
        display() {
            const {openButton, chatBox, sendButton} = this.args;
    
            openButton.addEventListener('click', () => this.toggleState(chatBox))
    
            sendButton.addEventListener('click', () => this.onSendButton(chatBox))
    
            const node = chatBox.querySelector('input');
            node.addEventListener("keyup", ({key}) => {
                if (key === "Enter") {
                    this.onSendButton(chatBox)
                }
            })
        }
    
        toggleState(chatbox) {
            this.state = !this.state;
    
            // show or hides the box
            if(this.state) {
                chatbox.classList.add('chatbox--active')
            } else {
                chatbox.classList.remove('chatbox--active')
            }
        }
    
        onSendButton(chatbox) {
            var textField = chatbox.querySelector('input');
            let text1 = textField.value
            if (text1 === "") {
                return;
            }
    
            let msg1 = { name: "User", message: text1 }
            this.messages.push(msg1);
    
            // http://127.0.0.1:5000/predict

            fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: JSON.stringify({ message: text1 }),
                mode: 'cors',
                headers: {
                'Content-Type': 'application/json'
                },
            })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "Buddi", message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox)
                textField.value = ''
    
            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                textField.value = ''
            });
        }
    
        updateChatText(chatbox) {
            var html = '';
            this.messages.slice().reverse().forEach(function(item, index) {
                if (item.name === "Buddi")
                {
                    html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
                }
                else
                {
                    html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
                }
            });
    
            const chatmessage = chatbox.querySelector('.chatbox__messages');
            chatmessage.innerHTML = html;
        }
    }
    
    
    const chatbox = new Chatbox();
    chatbox.display();
