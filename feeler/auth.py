from huggingface_hub import login

my_token = "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"

print(f"Attempting to login with token: {my_token[:5]}...")

try:
    login(token=my_token)
    print("✅ Success! You are logged in.")
except Exception as e:
    print(f"❌ Failed: {e}")