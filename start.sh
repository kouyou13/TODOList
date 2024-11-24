#!/bin/bash

# フロントエンドのサーバーを起動
(cd frontend && npm run dev) &

# バックエンドのサーバーを起動
(cd backend && python3 main.py) &

# 両方のプロセスを待機
wait
