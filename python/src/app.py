import openai
import os
import time

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
    
    MAX_RETRY = 5
    RETRY_INTERVAL = 1
    for i in range(0, MAX_RETRY):
        try:
            response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_history
            )
            break
        except:
            if i + 1 == MAX_RETRY:
                print("API接続エラー")
                break
            print("接続をリトライします: {}回目".format(i + 1))
            time.sleep(RETRY_INTERVAL)
            continue

    assistant_response = response.choices[0]["message"]["content"].strip()
    chat_history.append({"role": "assistant", "content": assistant_response})

    return assistant_response

if __name__=="__main__":
    main()