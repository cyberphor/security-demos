# Demo 01: Antivirus Evasion and Local File Inclusion Attacks

## Running an Application with a File Upload Function

## Deploying ClamAV as a Container
```bash
cd clamav/
docker-compose -f server.yaml up
```

## Attack a Container Using Known Malware
```bash
python client.py -f EICAR
```

## Attack a Container Using Unknown Malware
```bash
cd ../attacker/
python ../clamav/client.py -f reverse_shell.go
```

```bash
go build reverse_shell.go
python ../clamav/client.py -f reverse_shell
```

```bash
nc -nvlp 4444
./reverse_shell
```

## Protecting a Container From Unknown Malware

