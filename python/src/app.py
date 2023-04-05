import openai
import os

# APIキーの設定
openai.api_key = os.environ['OPENAI_API_KEY']
# プロンプトの設定
PROMPT = "あなたはこれからチャットボットとして振る舞ってください。"


# DB代わりにグローバルなListを持っておく
chat_history = [
    {"role": "system", "content": PROMPT},
]

def main():
    while True:
        print("あなた: ", end="")
        user_input = input()
        message = create_response(user_input)
        print("AI: " + message)

def create_response(user_input):
    chat_history.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=chat_history
    )
    assistant_response = response.choices[0]["message"]["content"].strip()
    chat_history.append({"role": "assistant", "content": assistant_response})

    return assistant_response

if __name__=="__main__":
    main()