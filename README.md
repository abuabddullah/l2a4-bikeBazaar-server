deploying backnd
need to ensure proper formating for ssh private key in github

```
name: Deploy to EC2

on: 
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs: 
  build: 
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.15
      
      - name: Print node version
        run: node -v

      - name: Install dependencies
        run: npm install

      - name: Build App
        run: npm run build


  deploy:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Checkout
        uses: actions/checkout@v5

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.15
      
      - name: Print node version
        run: node -v

      - name: Install dependencies
        run: npm install

      - name: Build App
        run: npm run build

      - name: configure SSH # need to generate SSH key be connected to EC2 instance [echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa]
        env:
          SSH_PRIVATE_KEY: ${{ secrets.EC2_SSH_PRIVATE_KEY }}
        run : |
          mkdir -p ~/.ssh
          echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H ${{ secrets.EC2_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy to EC2
        env:
          EC2_HOST: ${{ secrets.EC2_HOST }}
          EC2_USER: ${{ secrets.EC2_USER }}
        run: |
          # create deployment directory
          ssh $EC2_USER@$EC2_HOST "mkdir -p ~/app"

          # copy files to ec2 instance
          rsync -avz \
            --exclude='.git' \
            --exclude='node_modules' \
            --exclude='.github' \
            . $EC2_USER@$EC2_HOST:~/app/

          # install production dependencies on EC2
          ssh $EC2_USER@$EC2_HOST "cd ~/app && export PATH=$PATH:/run/user/1000/fnm_multishells/112424_1734077954807/bin && npm install"

          # Stop existing pm2 process if it exists
          ssh $EC2_USER@$EC2_HOST "export PATH=$PATH:/run/user/1000/fnm_multishells/112424_1734077954807/bin && pm2 delete nodejs-app || true"

          # Start the application with pm2
          ssh $EC2_USER@$EC2_HOST "export PATH=$PATH:/run/user/1000/fnm_multishells/112424_1734077954807/bin && cd ~/app && pm2 start dist/server.js --name nodejs-app"
        

```

-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----