import torch

model_path = r"d:\c26\nextjs project 2026\AI checker\backend\hybrid_vit_eff.pth"
state_dict = torch.load(model_path, map_location="cpu")

print("Keys in state_dict:")
for key in list(state_dict.keys())[:20]:
    print(key)

print("\nModel structure hints:")
unique_prefixes = set()
for key in state_dict.keys():
    unique_prefixes.add(key.split('.')[0])
print(f"Top level prefixes: {unique_prefixes}")
